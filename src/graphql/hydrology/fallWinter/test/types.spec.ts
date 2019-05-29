import { expect } from "chai";
import { graphql } from "graphql";
import t from "typy";

import { addMockFunction, getFields } from "../../../../utils/testHelpers";
import { schema } from "../../../schema";

describe("fallWinter typeDefs", () => {
  addMockFunction();

  const query = `
  query ($gaugeInfo: IGaugeInfo){
    getFallWinter(gaugeInfo: $gaugeInfo){
      gaugeId
      id
      magWet
      createdAt
      updatedAt
    }
  }
  `;

  it("should contain all getFallWinter query fields", async () => {
    const fields = getFields(query, 4);

    const res = await graphql(schema, query);

    fields.forEach(
      field => expect(t(res.data.getFallWinter, field).isDefined).to.be.true
    );
  });
});
