import { defineField, defineType } from "sanity";

// {
//     name: "RogerPulseBets",
//     shortDescription: "is excited by the potential",
//     fullDescription:
//       "AntiGravity is a great mix of narrative and economics…I can see this being a great success and has the potential to make a significant mark.",
//     externalLink: "https://forgenfts.com/project/antigravity",
//     imageUrl:
//       "https://s3.amazonaws.com/media.forgenfts.com/240508/cSwJ8aDgR73_t.jpg",
//   },

export const testimonialsTypes = defineType({
  name: "testimonials",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "externalLink",
      title: "External Link",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imageUrl",
      title: "Image URL",
      type: "url",
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "number",
      validation: (rule) => rule.required(),
    }),
  ],
});
