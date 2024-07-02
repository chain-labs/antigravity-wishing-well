import { defineField, defineType } from "sanity";
import { eventType } from "./event";
import {
  bookFields,
  communityFields,
  eventFields,
  heroFields,
  teamFields,
  videoFields,
} from "./fields";

export const collectiveType = defineType({
  name: "collective",
  title: "Collective Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "event", title: "Event" },
    { name: "community", title: "Community" },
    { name: "team", title: "Team Members" },
    { name: "video", title: "Video" },
    { name: "book", title: "Book" },
  ],
  fields: [
    ...heroFields,
    ...eventFields,
    ...communityFields,
    ...videoFields,
    ...teamFields,
    ...bookFields,
  ],
});
