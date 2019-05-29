import { allYearQueries, allYearTypes } from "./hydrology/allYear";
import { annualFlowQueries, annualFlowTypes } from "./hydrology/annualFlow";
import {
  classificationQueries,
  classificationTypes
} from "./hydrology/classification";
import { fallQueries, fallTypes } from "./hydrology/fall";
import { fallWinterQueries, fallWinterTypes } from "./hydrology/fallWinter";
import { gaugeMutations, gaugeQueries, gaugeTypes } from "./hydrology/gauge";
import { hydrographQueries, hydrographTypes } from "./hydrology/hydrograph";
import { springQueries, springTypes } from "./hydrology/spring";
import { summerQueries, summerTypes } from "./hydrology/summer";
import { winterQueries, winterTypes } from "./hydrology/winter";
import { memberMutations, memberQueries, memberTypes } from "./member";
import { memberPaperMutations, memberPaperTypes } from "./memberPaper";
import { paperMutations, paperQueries, paperTypes } from "./paper";
import { tsUploadMutations, tsUploadTypes } from "./tsUpload";
import { userMutations, userQueries, userTypes } from "./user";

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
  tsUploadTypes,
  summerTypes,
  springTypes,
  fallTypes,
  fallWinterTypes,
  winterTypes
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
  ...summerQueries,
  ...springQueries,
  ...fallQueries,
  ...fallWinterQueries,
  ...winterQueries
};

const Mutation = {
  ...gaugeMutations,
  ...userMutations,
  ...memberMutations,
  ...paperMutations,
  ...memberPaperMutations,
  ...tsUploadMutations
};

export { typeDefs, Query, Mutation };
