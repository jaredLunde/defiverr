import * as nexus from 'nexus';
import {GraphQLDate, GraphQLJSON} from 'graphql-scalars';

export const types = [
  nexus.decorateType(GraphQLDate, {
    sourceType: 'Date',
    asNexusMethod: 'date',
  }),
  nexus.decorateType(GraphQLJSON, {
    sourceType: 'import("type-fest").JsonValue',
    asNexusMethod: 'json',
  }),
];
