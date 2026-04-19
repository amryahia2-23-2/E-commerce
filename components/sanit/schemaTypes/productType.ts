import { defineField, defineType } from 'sanity'

export const ProductType = defineType({
    name: 'product',
    title: 'Products',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'product name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
        }),
        defineField({
            name: 'images',
            title: 'Product Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
            ],
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "discount",
            title: "Discount",
            type: "number",
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'array',
            of: [
                {
                type: 'string',
                options: {
                    list: [
                    { title: 'Hot', value: 'hot' },
                    { title: 'Sale', value: 'sale' },
                    { title: 'New', value: 'new' },
                    ],
                },
                },
            ],
            }),
        defineField({
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: [{ type: 'category' }],
        validation: (Rule) => Rule.required(),
        }),
        defineField({
        name: 'brand',
        title: 'Brand',
        type: 'reference',
        to: [{ type: 'brand' }],
        }),
        defineField({
            name: "stock",
            type: "number",
            title: "Stock Quantity",
            validation: (Rule) =>
                Rule.required().min(0).error("Stock cannot be negative"),
        }),
    ],

    preview: {
        select: {
            title: 'name',
            subtitle: 'description',
            media: 'images.0',
        },
    },
});

