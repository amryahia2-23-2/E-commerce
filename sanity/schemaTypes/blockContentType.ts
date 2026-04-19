import { defineArrayMember, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'



export const BlockContentType = defineType({
    name: 'blockContent',
    title: 'Block Content',
    type: 'array',
    of: [
        defineArrayMember({
            type: 'block',
            styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H1', value: 'h1' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                    { title: 'H4', value: 'h4' },
                    { title: 'Quote', value: 'blockquote' },
            ],
            lists: [{title: 'Bullet', value: 'bullet'}],
            marks: {
                decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' },     
                ],
                annotations: [
                    {
                        name: 'link',  
                        type: 'object',
                        title: 'URL',
                        fields: [
                            { name: 'href', type: 'url', title: 'URL' },
                        ],
                    },
                ],
            },
        }),
        defineArrayMember({ 
            type: 'image',
            icon: ImageIcon,
            title: 'Image',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt', 
                    type: 'string',
                    title: 'Alternative Text'
                }
            ]
        }),
    ],
});