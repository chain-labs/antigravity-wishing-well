import { defineField, defineType } from "sanity";

export const externalLinksType = defineType({
  name: "external_links",
  title: "External Links",
  type: "document",
  fields: [
    defineField({
      name: "how_to_contribute",
      title: "How to Contribute URL",
      type: "url",
    }),
    defineField({
      name: "best_way_to_rank_up",
      title: "Best Ways to Rank Up CTA URL",
      type: "url",
    }),
    defineField({
      name: "collective_rewards_101",
      title: "Collective Rewards 101",
      type: "url",
    }),
    defineField({
      name: "twitter",
      title: "Antigravity Twitter",
      type: "url",
    }),
    defineField({
      name: "telegram",
      title: "Antigravity Telegram",
      type: "url",
    }),
    defineField({
      name: "discord",
      title: "Antigravity Discord",
      type: "url",
    }),
    defineField({
      name: "darkpaper",
      title: "DarkPaper URL",
      type: "url",
    }),
    defineField({
      name: "darkerpaper",
      title: "DarkerPaper URL",
      type: "url",
    }),
  ],
});
