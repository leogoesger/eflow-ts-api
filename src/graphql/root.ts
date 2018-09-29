import { categoryQueries, categoryTypes } from './category';
import { productQueries, productTypes, productMutations } from './product';

export const rootQuery = `
    type Query 
    type Mutation
`;

const typeDefs = [rootQuery, productTypes, categoryTypes];
const Query = { ...categoryQueries, ...productQueries };
const Mutation = { ...productMutations };

export { typeDefs, Query, Mutation };
