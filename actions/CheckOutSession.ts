"use server"
import stripe from '@/lib/stripe';
import { Address } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { CartItem } from '@/store';
import Stripe from 'stripe';
import { backendClient } from '@/sanity/lib/backendClient';


export interface Metadata {
    orderNumber: string,
    customerName: string,
    customerEmail: string,
    clerkUserId: string | undefined,
    address: Address | null,
};

export interface GroupedItems {
    product: CartItem["product"];
    quantity: number;
}

export async function createCheckOutSession(
    groupedItems: GroupedItems[],
    metadata: Metadata) {
    try {
        // Validation
        if (!groupedItems || groupedItems.length === 0) {
            throw new Error("Cart is empty");
        }

        if (!metadata.customerEmail || !metadata.customerEmail.includes('@')) {
            throw new Error("Invalid email address");
        }

        // ✅ التحقق من المخزون قبل إنشاء الـ session
        console.log("🔍 Checking stock availability...");
        for (const item of groupedItems) {
            const product = await backendClient.getDocument(item.product._id);

            if (!product) {
                throw new Error(`Product ${item.product.name} not found`);
            }

            if (typeof product.stock !== 'number') {
                throw new Error(`Product ${item.product.name} has invalid stock`);
            }

            if (product.stock < item.quantity) {
                throw new Error(
                    `Insufficient stock for ${item.product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
                );
            }

            console.log(`  ✅ ${item.product.name}: ${product.stock} available, ${item.quantity} requested`);
        }

        const customers = await stripe.customers.list({
            email: metadata.customerEmail,
            limit: 1,
        });
        const customerId = customers.data.length > 0 ? customers.data[0].id : "";
        const sessionPayload: Stripe.Checkout.SessionCreateParams = {
            metadata: {
                orderNumber: metadata.orderNumber,
                customerName: metadata.customerName,
                customerEmail: metadata.customerEmail,
                clerkUserId: metadata.clerkUserId || "",
                address: JSON.stringify(metadata.address),
            },
            mode: "payment",
            allow_promotion_codes: true,
            payment_method_types: ["card"],
            invoice_creation: {
                enabled: true,
            },
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&order_number=${metadata.orderNumber}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
            line_items: groupedItems.map((item) => ({
                price_data: {
                    currency: "USD",
                    unit_amount: Math.round(item.product.price! * 100),
                    product_data: {
                        name: item.product.name || "Product",
                        description: item.product.description,
                        metadata: { id: item.product._id },
                        images: item.product.images && item.product.images.length > 0 ? [urlFor(item.product.images[0]).url()] : undefined,
                    },
                },
                quantity: item.quantity,
            })),

        };
        if (customerId) {
            sessionPayload.customer = customerId;
        } else {
            sessionPayload.customer_email = metadata.customerEmail;
        }

        console.log("💳 Creating Stripe checkout session...");
        const session = await stripe.checkout.sessions.create(sessionPayload);
        console.log("✅ Checkout session created:", session.id);

        return session.url || null;
    } catch (error) {
        console.error("Checkout session error:", error);
        throw error;
    }

}