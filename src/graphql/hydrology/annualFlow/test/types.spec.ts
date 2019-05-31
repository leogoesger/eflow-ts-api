import { expect } from "chai";
import { graphql } from "graphql";
import t from "typy";

import { schema } from "../../../schema";
import { addMockFunction, getFields } from "../../../../utils/testHelpers";

describe("AnnualFlow typeDefs", () => {
  addMockFunction();

  const query = `
  query ($gaugeInfo: IGaugeInfo){
    getAnnualFlow(gaugeInfo: $gaugeInfo){
      id
      gaugeId
      flowData
      condition
      year
      createdAt
      updatedAt
    }
  }
  `;

  it("should contain all getAnnualFlow query fields", async () => {
    const fields = getFields(query, 4);

    const res = await graphql(schema, query);

    fields.forEach(
      field => expect(t(res.data.getAnnualFlow, field).isDefined).to.be.true
    );
  });
});
