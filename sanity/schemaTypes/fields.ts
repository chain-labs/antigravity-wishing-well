import { defineField } from "sanity";

export const heroFields = [
  defineField({
    name: "heroText",
    title: "Hero Text",
    group: "hero",
    description:
      "Add the text that needs to be the hero header. Every text that needs to be added as a separate line must be added as a new list element.",
    type: "array",
    of: [{ type: "string" }],
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "heroDescription",
    title: "Hero Description",
    group: "hero",
    description:
      "Add the text that needs to be the hero subtext. Every text that needs to be added as a separate line must be added as a new list element.",
    type: "array",
    of: [{ type: "string" }],
    validation: (rule) => rule.required(),
  }),
];

export const eventFields = [
  defineField({
    name: "event",
    type: "reference",
    title: "Event",
    group: "event",
    to: [{ type: "event" }],
  }),
];

export const communityFields = [
  defineField({
    name: "community_header",
    title: "Community Header",
    type: "array",
    of: [{ type: "string" }],
    group: "community",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "post",
    title: "Community Post",
    group: "community",
    type: "array",
    of: [{ type: "community" }],
  }),
];

export const videoFields = [
  defineField({
    name: "video_title",
    title: "Video Title",
    type: "string",
    group: "video",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "video_url",
    title: "Video URL",
    type: "url",
    group: "video",
    validation: (rule) => rule.required(),
  }),
];

export const bookFields = [
  defineField({
    name: "book_header",
    title: "Book Section Header",
    type: "string",
    group: "book",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "book_description",
    title: "Book Description",
    type: "string",
    group: "book",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "book_url",
    title: "Book URL",
    type: "url",
    group: "book",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "book_image",
    title: "Book Image",
    type: "image",
    group: "book",
    validation: (rule) => rule.required(),
  }),
];

export const teamFields = [
  defineField({
    name: "team_header",
    title: "Team Header",
    type: "array",
    of: [{ type: "string" }],
    group: "team",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "team_members",
    title: "Team Members",
    group: "team",
    type: "array",
    of: [{ type: "team_member" }],
  }),
];
