import { defineField } from 'sanity'
import { TagIcon } from '@sanity/icons'



export const BlockCategory = {
    name: 'blockCategory',
    title: 'Block Category',
    type: 'document',
    icon: TagIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string'
        }),
        defineField({
            name: 'description',
            type: 'text'
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                
            }
        }),
    ],
};