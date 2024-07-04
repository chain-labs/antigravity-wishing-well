import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Event Name",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Event Date",
      type: "datetime",
    }),
    defineField({
      name: "description",
      title: "Event Description",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "register_url",
      title: "Registration Link",
      type: "url",
    }),
  ],
});
