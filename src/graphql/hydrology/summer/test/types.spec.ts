import { expect } from "chai";
import { graphql } from "graphql";

import { schema } from "../../../schema";
import { addMockFunction } from "../../../../utils/testHelpers";

describe("summer typeDefs", () => {
  addMockFunction();

  const query = `
  query ($gaugeInfo: IGaugeInfo){
    getSummer(gaugeInfo: $gaugeInfo){
      gaugeId
      timing
      magnitude10
      magnitude50
      durationWet
      durationFlush
      noFlowCount
      id
    }
  }
  `;

  it("should contain all getSummer query fields", async () => {
    const res = await graphql(schema, query);
    expect(Boolean(res.data.getSummer.id)).to.be.true;
    expect(Boolean(res.data.getSummer.timing)).to.be.true;
    expect(Boolean(res.data.getSummer.magnitude10)).to.be.true;
    expect(Boolean(res.data.getSummer.magnitude50)).to.be.true;
    expect(Boolean(res.data.getSummer.durationWet)).to.be.true;
    expect(Boolean(res.data.getSummer.durationFlush)).to.be.true;
    expect(Boolean(res.data.getSummer.noFlowCount)).to.be.true;
    expect(Boolean(res.data.getSummer.gaugeId)).to.be.true;
  });
});
