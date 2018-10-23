import { classificationQueries, classificationTypes } from './classification';
import { gaugeQueries, gaugeMutations, gaugeTypes } from './gauge';
import { allYearQueries, allYearTypes } from './allYear';
import { userQueries, userMutations, userTypes } from './user';

export const rootQuery = `
    type Query 
    type Mutation
`;

const typeDefs = [
  rootQuery,
  classificationTypes,
  gaugeTypes,
  allYearTypes,
  userTypes,
];
const Query = {
  ...classificationQueries,
  ...gaugeQueries,
  ...allYearQueries,
  ...userQueries,
};
const Mutation = { ...gaugeMutations, ...userMutations };

export { typeDefs, Query, Mutation };
