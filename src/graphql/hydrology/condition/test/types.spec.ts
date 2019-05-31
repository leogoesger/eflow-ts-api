import { expect } from "chai";
import { graphql } from "graphql";
import t from "typy";
import { addMockFunction, getFields } from "../../../../utils/testHelpers";
import { schema } from "../../../schema";

describe("Conditions typeDefs", () => {
  addMockFunction();

  const query = `
  query ($gaugeInfo : IGaugeInfo) {
    getCondition(gaugeInfo: $gaugeInfo) {
      id
      createdAt
      year
      conditions
      updatedAt
      gaugeId
    }
  }
  `;

  it("should contain all getCondition query fields", async () => {
    const fields = getFields(query, 4);

    const res = await graphql(schema, query);

    fields.forEach(field => {
      expect(t(res.data.getCondition, field).isDefined).to.be.true;
    });
  });
});
