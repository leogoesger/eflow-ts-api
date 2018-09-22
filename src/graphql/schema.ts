import { makeExecutableSchema } from 'graphql-tools';

import { categoryQueries, categoryTypes } from './category';
import { productQueries, productTypes } from './product';

const typeDefs = [categoryTypes, productTypes];
const Query = { ...categoryQueries, ...productQueries };

export default makeExecutableSchema({
    typeDefs,
    resolvers: {
        Query,
    },
});
