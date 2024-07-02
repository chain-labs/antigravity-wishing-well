import { type SchemaTypeDefinition } from "sanity";
import { collectiveType } from "./schemaTypes/collective";
import { eventType } from "./schemaTypes/event";
import { communityType } from "./schemaTypes/community";
import { teamMembersType } from "./schemaTypes/teamMember";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [collectiveType, eventType, communityType, teamMembersType],
};
