import { type SchemaTypeDefinition } from "sanity";
import { collectiveType } from "./schemaTypes/collective";
import { eventType } from "./schemaTypes/event";
import { communityType } from "./schemaTypes/community";
import { teamMembersType } from "./schemaTypes/teamMember";
import { timestampType } from "./schemaTypes/timestamps";
import { externalLinksType } from "./schemaTypes/externalLinks";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    externalLinksType,
    collectiveType,
    eventType,
    communityType,
    teamMembersType,
    timestampType,
  ],
};
