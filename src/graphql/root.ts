import { classificationQueries, classificationTypes } from './classification';
import { gaugeQueries, gaugeMutations, gaugeTypes } from './gauge';

export const rootQuery = `
    type Query 
    type Mutation
`;

const typeDefs = [rootQuery, classificationTypes, gaugeTypes];
const Query = {
  ...classificationQueries,
  ...gaugeQueries,
};
const Mutation = { ...gaugeMutations };

export { typeDefs, Query, Mutation };
