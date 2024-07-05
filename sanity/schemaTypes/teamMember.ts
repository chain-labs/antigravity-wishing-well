import { defineField, defineType } from "sanity";

export const teamMembersType = defineType({
  name: "team_member",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "handle",
      title: "Member Handle",
      type: "string",
      placeholder: "@Username",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Member Image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "socials",
      title: "Member Socials",
      type: "array",
      of: [
        defineField({
          type: "document",
          name: "member",
          title: "Member",
          fields: [
            defineField({
              type: "string",
              options: {
                list: ["Twitter", "Telegram", "Youtube", "Instagram", "TikTok"],
              },
              name: "type",
              title: "Platform",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Social URL",
              validation: (rule) => rule.required(),
              type: "url",
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
});
