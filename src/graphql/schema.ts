import { makeExecutableSchema } from 'graphql-tools';

import { directiveResolvers } from './directiveResolvers';
import { typeDefs, Query, Mutation } from './root';

const rootQuery = `
  directive @isAuthenticated on FIELD | FIELD_DEFINITION
  directive @hasRole(role: String) on FIELD | FIELD_DEFINITION

  input validatePL {
    gaugeNum: Int
    yearNum: Int
  }

  input PagePL {
    offset: Int
    limit: Int
  }

  type Query
  type Mutation
`;

export const schema = makeExecutableSchema({
  typeDefs: [rootQuery, ...typeDefs],
  resolvers: {
    Query,
    Mutation,
  },
  directiveResolvers,
});
