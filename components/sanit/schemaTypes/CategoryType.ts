import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const CategoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      
    }),
    defineField({
        name: "range",
        type: "number",
        description: "The range of the category (e.g., 0-100, 100-200, etc.)",
    }),
    defineField({
        name:"featured",
        type:"boolean",
        initialValue: false,
    }),
    defineField({
        name:"image",
        type:"image",
        options: {
            hotspot: true,
        },
    })

],
preview: {
    select: {
      title: "name",
      supertitle: "description",
      media: "image",
    }
  }

});