import { expect } from "chai";
import { graphql } from "graphql";

import { schema } from "../../../schema";
import { addMockFunction } from "../../../../utils/testHelpers";

describe("spring typeDefs", () => {
  addMockFunction();

  const query = `
  query ($gaugeInfo: IGaugeInfo){
    getFall(gaugeInfo: $gaugeInfo){
      gaugeId
      timing
      magnitude
      duration
      timingWet
      id
    }
  }
  `;

  it("should contain all getFall query fields", async () => {
    const res = await graphql(schema, query);
    expect(Boolean(res.data.getFall.id)).to.be.true;
    expect(Boolean(res.data.getFall.timing)).to.be.true;
    expect(Boolean(res.data.getFall.magnitude)).to.be.true;
    expect(Boolean(res.data.getFall.timingWet)).to.be.true;
    expect(Boolean(res.data.getFall.duration)).to.be.true;
    expect(Boolean(res.data.getFall.gaugeId)).to.be.true;
  });
});
