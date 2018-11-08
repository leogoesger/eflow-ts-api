import {
  classificationQueries,
  classificationTypes,
} from './hydrology/classification';
import { gaugeQueries, gaugeMutations, gaugeTypes } from './hydrology/gauge';
import { allYearQueries, allYearTypes } from './hydrology/allYear';
import { userQueries, userMutations, userTypes } from './user';
import { annualFlowQueries, annualFlowTypes } from './hydrology/annualFlow';
import { hydrographTypes, hydrographQueries } from './hydrology/hydrograph';
import { memberTypes, memberQueries, memberMutations } from './member';
import { paperTypes, paperQueries, paperMutations } from './paper';
import { memberPaperTypes, memberPaperMutations } from './memberPaper';

const typeDefs = [
  classificationTypes,
  gaugeTypes,
  allYearTypes,
  userTypes,
  annualFlowTypes,
  hydrographTypes,
  memberTypes,
  paperTypes,
  memberPaperTypes,
];

const Query = {
  ...classificationQueries,
  ...gaugeQueries,
  ...allYearQueries,
  ...userQueries,
  ...annualFlowQueries,
  ...hydrographQueries,
  ...memberQueries,
  ...paperQueries,
};

const Mutation = {
  ...gaugeMutations,
  ...userMutations,
  ...memberMutations,
  ...paperMutations,
  ...memberPaperMutations,
};

export { typeDefs, Query, Mutation };
