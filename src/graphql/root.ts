import { classificationQueries, classificationTypes } from './classification';
import { gaugeQueries, gaugeMutations, gaugeTypes } from './gauge';
import { allYearQueries, allYearTypes } from './allYear';
import { userQueries, userMutations, userTypes } from './user';
import { annualFlowQueries, annualFlowTypes } from './annualFlow';
import { hydrographTypes } from './hydrograph';

export const rootQuery = `
  directive @isAuthenticated on FIELD | FIELD_DEFINITION
  directive @hasRole(role: String) on FIELD | FIELD_DEFINITION

  input validatePL {
    gaugeNum: Int
    yearNum: Int
  }
  
  type Query 
  type Mutation
`;

const typeDefs = [
  rootQuery,
  classificationTypes,
  gaugeTypes,
  allYearTypes,
  userTypes,
  annualFlowTypes,
  hydrographTypes,
];
const Query = {
  ...classificationQueries,
  ...gaugeQueries,
  ...allYearQueries,
  ...userQueries,
  ...annualFlowQueries,
};
const Mutation = { ...gaugeMutations, ...userMutations };

export { typeDefs, Query, Mutation };
