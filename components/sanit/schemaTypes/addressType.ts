
import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const AddressType = defineType({
    name: "address",
    title: "Address",
    type: "document",
    icon: HomeIcon,
    fields: [
        defineField({
            name: "name",
            title: "Address name",
            type: "string",
            description: "A name for the address (e.g., Home, Work, etc.)",
            validation: (Rule) => Rule.required().max(50),

        }),
        defineField({
            name: "email",
            title: "User Email",
            type: "email",
        }),
        defineField({
            name: "address",
            title: "Street Address",
            type: "string",
            description: "The street address (e.g., 123 Main St)",
            validation: (Rule) => Rule.required().max(100),
        }),
        defineField({
            name: "city",
            title: "City",
            type: "string",
            description: "The city (e.g., New York)",
            validation: (Rule) => Rule.required().max(50),
        }),
        defineField({
            name: "state",
            title: "State",
            type: "string",
            description: "Two letter code state (e.g., NY)",
            validation: (Rule) => Rule.required().length(2).uppercase(),
        }),
        defineField({
            name: "zipCode",
            title: "ZIP Code",
            type: "string",
            description: "The ZIP code (e.g., 10001)",
            validation: (Rule) => Rule.required().regex(/^\d{5}(-\d{4})?$/, {
                name: "valid ZIP code",
                invert: false,
            }).custom((zip: string | undefined) => {
                if (!zip) {
                    return "ZIP code is required";
                };
                if(!zip.match(/^\d{5}(-\d{4})?$/)) {
                    return "Invalid ZIP code format";
                }
                return true;
            }),
           
        }),
         defineField({
            name: "createdAt",
            title: "Created At",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
         }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "address",
            city: "city",
            state: "state",
            isDefault : "default",
        },
        prepare(selection) {
            const { title, subtitle, city, state, isDefault } = selection;
            return {
                title: `${title} ${isDefault ? "(Default)" : ""}`,
                subtitle: `${subtitle}, ${city}, ${state}`,
            };
        }
    }
})