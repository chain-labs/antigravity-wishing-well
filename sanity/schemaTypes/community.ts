import { defineField, defineType } from "sanity";

export const communityType = defineType({
  name: "community",
  title: "Community Posts",
  type: "document",
  fields: [
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Post Image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "height",
      title: "Image Height",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "width",
      title: "Image Width",
      type: "number",
      validation: (rule) => rule.required(),
    }),
  ],
});
