import { makeExecutableSchema } from 'graphql-tools';

import { directiveResolvers } from './directiveResolvers';
import { typeDefs, Query, Mutation } from './root';

export default makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
  directiveResolvers,
});
