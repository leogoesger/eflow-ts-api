import { expect } from "chai";
import { graphql } from "graphql";

import { schema } from "../../../schema";
import { addMockFunction } from "../../../../utils/testHelpers";

describe("spring typeDefs", () => {
  addMockFunction();

  const query = `
  query ($gaugeInfo: IGaugeInfo){
    getSpring(gaugeInfo: $gaugeInfo){
      gaugeId
      timing
      magnitude
      duration
      rateOfChange
      id
    }
  }
  `;

  it("should contain all getSpring query fields", async () => {
    const res = await graphql(schema, query);
    expect(Boolean(res.data.getSpring.id)).to.be.true;
    expect(Boolean(res.data.getSpring.timing)).to.be.true;
    expect(Boolean(res.data.getSpring.magnitude)).to.be.true;
    expect(Boolean(res.data.getSpring.rateOfChange)).to.be.true;
    expect(Boolean(res.data.getSpring.duration)).to.be.true;
    expect(Boolean(res.data.getSpring.gaugeId)).to.be.true;
  });
});
