import { type SchemaTypeDefinition } from "sanity";
import { collectiveType } from "./schemaTypes/collective";
import { eventType } from "./schemaTypes/event";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [collectiveType, eventType],
};
