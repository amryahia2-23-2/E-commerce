import { Metadata } from "@/actions/CheckOutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import Stripe from "stripe";
import { revalidatePath } from "next/cache";

// Helper function to update stock levels
async function updateStockLevels(stockUpdates: { productId: string; quantity: number }[]) {
    for (const { productId, quantity } of stockUpdates) {
        try {
            const product = await backendClient.getDocument(productId);

            if (!product || typeof product.stock !== "number") {
                console.warn(`Product ${productId} not found or missing stock field`);
                continue;
            }

            const newStock = Math.max(product.stock - quantity, 0);

            await backendClient.patch(productId).set({ stock: newStock }).commit();
        } catch (error) {
            console.error(`Error updating stock for product ${productId}:`, error);
        }
    }
}

// Helper function to create order in Sanity
async function createOrderInSanity(
    session: Stripe.Checkout.Session,
    invoice: Stripe.Invoice | null
) {
    console.log("Starting order creation in Sanity");
    const {
        id,
        amount_total,
        currency,
        metadata,
        payment_intent,
        total_details,
    } = session;

    console.log("🔍 Session metadata:", metadata);

    const { orderNumber, customerName, customerEmail, clerkUserId, address } =
        metadata as unknown as Metadata & { address: string };

    const parseAddress = address ? JSON.parse(address) : null;
    console.log("Parsed address:", parseAddress);

    console.log("Fetching line items from Stripe...");
    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, {
        expand: ["data.price.product"]
    });

    console.log("Line items count:", lineItemsWithProduct.data.length);

    const sanityProducts = [];
    const stockUpdates = [];

    for (const item of lineItemsWithProduct.data) {
        const productId = (item.price?.product as Stripe.Product)?.metadata?.id;
        const quantity = item.quantity || 0;

        console.log(`  - Product ID: ${productId}, Quantity: ${quantity}`);

        if (!productId) {
            console.warn("Product missing ID in metadata");
            continue;
        }

        sanityProducts.push({
            _key: crypto.randomUUID(),
            product: {
                _type: "reference",
                _ref: productId,
            },
            quantity,
        });

        stockUpdates.push({
            productId,
            quantity,
        });
    }

    console.log("Creating order document in Sanity...");
    const order = await backendClient.create({
        _type: "order",
        orderNumber,
        stripeCheckoutSessionId: id,
        stripePaymentIntentId: payment_intent as string,
        customerName,
        stripeCustomerId: customerEmail,
        clerkUserId: clerkUserId,
        email: customerEmail,
        currency,
        amountDiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
        products: sanityProducts,
        totalPrice: amount_total ? amount_total / 100 : 0,
        status: "paid",
        orderDate: new Date().toISOString(),
        invoice: invoice ? {
            id: invoice.id,
            number: invoice.number,
            hosted_invoice_url: invoice.hosted_invoice_url,
        } : null,
        address: parseAddress ? {
            state: parseAddress.state,
            zip: parseAddress.zip,
            city: parseAddress.city,
            address: parseAddress.address,
            name: parseAddress.name,
        } : null,
    });

    console.log("Order created in Sanity:", order._id);
    console.log("Updating stock levels...");
    await updateStockLevels(stockUpdates);
    console.log("Stock levels updated");



    return order;
}

export async function POST(request: NextRequest) {
    console.log("Webhook received at:", new Date().toISOString());

    const body = await request.text();
    const HeadersList = await headers();
    const sig = HeadersList.get("stripe-signature");

    console.log("Webhook signature present:", !!sig);

    if (!sig) {
        console.error("Missing stripe-signature header");
        return Response.json({ error: "Missing signature" }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
        console.error("Missing STRIPE_WEBHOOK_SECRET environment variable");
        return Response.json({ error: "Missing webhook secret" }, { status: 500 });
    }

    console.log("Webhook secret configured:", webhookSecret.substring(0, 10) + "...");

    let event: Stripe.Event;
    try {
        event = Stripe.webhooks.constructEvent(body, sig, webhookSecret);
        console.log("Webhook signature verified");
        console.log("Event type:", event.type);
    } catch (error) {
        console.error("Webhook signature verification failed:", error);
        return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        console.log("Processing checkout.session.completed event");
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Session ID:", session.id);
        console.log("Amount:", session.amount_total);
        console.log("Customer email:", session.customer_email);

        const invoice = session.invoice
            ? await stripe.invoices.retrieve(session.invoice as string)
            : null;

        try {
            console.log("Creating order in Sanity...");
            const order = await createOrderInSanity(session, invoice);
            console.log("Order created successfully:", order._id);
            return Response.json({ received: true, orderId: order._id });
        } catch (error) {
            console.error("Error creating order in Sanity:", error);
            return Response.json(
                { error: "Error creating order in Sanity" },
                { status: 500 }
            );
        }
    }

    console.log("Event type not handled:", event.type);
    return Response.json({ received: true }, { status: 200 });
}