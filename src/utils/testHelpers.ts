import { addMockFunctionsToSchema } from 'graphql-tools';

import { schema } from '../graphql/schema';

export const addMockFunction = () =>
  addMockFunctionsToSchema({
    schema,
    mocks: {
      Boolean: () => false,
      ID: () => '1',
      Int: () => 1,
      Float: () => 12.34,
      String: () => 'string',
    },
  });
