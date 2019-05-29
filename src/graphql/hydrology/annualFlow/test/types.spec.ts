import { expect } from "chai";
import { graphql } from "graphql";

import { schema } from "../../../schema";
import { addMockFunction } from "../../../../utils/testHelpers";

describe("AllYear typeDefs", () => {
  addMockFunction();

  const query = `
  query ($gaugeInfo: IGaugeInfo){
    getAnnualFlow(gaugeInfo: $gaugeInfo){
      gaugeId
      flowData
      year
    }
  }
  `;

  it("should contain all getAnnualFlow query fields", async () => {
    const res = await graphql(schema, query);
    expect(Boolean(res.data.getAnnualFlow.gaugeId)).to.be.true;
    expect(Boolean(res.data.getAnnualFlow.flowData)).to.be.true;
    expect(Boolean(res.data.getAnnualFlow.year)).to.be.true;
  });
});
