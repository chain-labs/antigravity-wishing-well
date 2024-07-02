import { defineField, defineType } from "sanity";
import { eventType } from "./event";

export const collectiveType = defineType({
  name: "collective",
  title: "Collective Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "event", title: "Event" },
  ],
  fields: [
    defineField({
      name: "heroText",
      title: "Hero Text",
      group: "hero",
      description:
        "Add the text that needs to be the hero header. Every text that needs to be added as a separate line must be added as a new list element.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      group: "hero",
      description:
        "Add the text that needs to be the hero subtext. Every text that needs to be added as a separate line must be added as a new list element.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "event",
      type: "reference",
      title: "Event",
      group: "event",
      to: [{ type: "event" }],
    }),         
  ],
});
