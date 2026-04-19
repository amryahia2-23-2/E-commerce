import { defineArrayMember, defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons';

export const BlogType = defineType({     // ✅ wrap with defineType
    name: 'blogType',
    title: 'Blog',
    type: 'document',
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
            }
        }),
        defineField({
            name: 'author',
            type: 'reference',
            to: [{ type: 'author' }]
        }),
        defineField({
            name: 'mainImage',
            type: 'image',
            options: {
                hotspot: true,
            }
        }),
        defineField({
            name: 'blogCategories',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'reference',
                    to: [{ type: 'blockCategory' }]
                })
            ],
        }),
        defineField({
            name: 'publishedAt',
            type: 'datetime',
        }),
        defineField({
            name: 'islatest',
            title: 'Latest Blog',
            type: 'boolean',
            description: 'Toggle to Latest Blog',
            initialValue: true,
        }),
        defineField({
            name: 'body',
            title: 'Blog Content',
            type: 'blockContent',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
            islatest: 'islatest',
        },
        prepare(selection) {              // ✅ no manual type annotation
            const { author, islatest } = selection;
            return {
                ...selection,
                subtitle: author
                    ? `By ${author} ${islatest ? "(Latest)" : ""}`
                    : "",
            };
        },
    },
});