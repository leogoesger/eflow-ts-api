import { makeExecutableSchema } from 'graphql-tools';

import { typeDefs, Query, Mutation } from './root';

export default makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
});
