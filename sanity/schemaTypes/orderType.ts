import { Currency } from 'lucide-react';
import { defineArrayMember, defineField, defineType , } from 'sanity';
import { BasketIcon } from '@sanity/icons';


export const orderType =  defineType({
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
        defineField({
            name: 'orderNumber',
            title: 'Order Number',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        {
            name: 'invoice',
            type: 'object',
            fields: [
                {name: 'id', type: 'string'},
                {name: 'number', type: 'string'},
                {name: 'hosted_invoice_url', type: 'url'},
            ],
        },
        defineField({
            name:'stripeCustomerId',
            title:'Stripe Customer ID',
            type:'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name:'stripePaymentIntentId',
            title:'Stripe Payment Intent ID',
            type:'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name:'stripeCheckoutSessionId',
            title:'Stripe Checkout Session ID',
            type:'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'clerkUserId',
            title: 'Clerk User ID',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'customerName',
            title: 'Customer Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'email',
            title: 'Customer Email',
            type: 'string',
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: 'products',
            title: 'Products',
            type: 'array',
            of: [
                    defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'product',
                            title: 'Product Bought',
                            type: 'reference',
                            to: [{ type: 'product' }],
                        }),
                        defineField({
                            name: 'quantity',
                            title: 'Quantity purchased',
                            type: 'number',
                            validation: (Rule) => Rule.required(),
                        }),
                        ],
                            preview: {
                                select: {
                                    product: 'product.name',
                                    quantity: 'quantity',
                                    image: 'product.image',
                                    price: 'product.price',
                                    Currency: 'product.Currency',
                                },
                                prepare(select) {
                                    return {
                                        title: `${select.product} (x${select.quantity})`,
                                        media: select.image,
                                        subtitle: `${select.price} ${Currency}`,
                                    }
                                },
                            },
                        }),
                    ],
                }),
        defineField({
            name: 'totalPrice',
            title: 'Total price',
            type: 'number',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name:'currency',
            title:'Currency',
            type:'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'shipping',
            title: 'Shipping',
            type: 'string',
            // validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'amountDiscount',
            title: 'Amount Discount',
            type: 'number',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name:'address',
            title:'Shipping Address',
            type:'object', 
            fields: [
                defineField({
                    name: 'state',
                    title: 'State',
                    type: 'string',
                }),
                defineField({
                    name: 'zip',
                    title: 'ZIP Code',
                    type: 'string',
                }),
                defineField({
                    name: 'city',
                    title: 'City',
                    type: 'string',
                }),
                defineField({
                    name: 'address',
                    title: 'Address',
                    type: 'string',
                }),
                defineField({ 
                    name: 'name',
                    title: 'Name',
                    type: 'string',
                }),
            ]
        }),
        defineField({
            name:'status',
            title:'order Status',
            type:'string',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Processing', value: 'processing' },
                    {title: 'paid' , value: 'paid'},
                    { title: 'Shipped', value: 'shipped' },
                    {title: 'Out for Delivery', value: 'out_for_delivery'},
                    { title: 'Delivered', value: 'delivered' },
                    { title: 'Cancelled', value: 'cancelled' },
                ],
            }, 
        }),
        defineField({
            name: "isHidden",
            title: "Hidden from user",
            type: "boolean",
            initialValue: false,
            }),
        defineField({
            name: 'orderDate',
            title: 'Order Date',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            name: 'customerName',
            amount: 'totalprice',
            Currency: 'currency',
            orderId: 'orderNumber',
            email: 'email',
        },
        prepare(select) {
        const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`;
        return {
            title: `${select.name} (${orderIdSnippet})`,
            subtitle: `${select.amount} ${select.Currency} - ${select.email}`,
            media: BasketIcon,
        };
    },
 },
});

// export default orderType;

    



