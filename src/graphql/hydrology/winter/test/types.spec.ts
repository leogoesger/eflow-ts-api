import { expect } from "chai";
import { graphql } from "graphql";
import t from "typy";

import { addMockFunction, getFields } from "../../../../utils/testHelpers";
import { schema } from "../../../schema";

describe("winter typeDefs", () => {
  addMockFunction();

  const query = `
  query ($gaugeInfo: IGaugeInfo){
    getWinter(gaugeInfo: $gaugeInfo){
      id
      timing2
      timing5
      timing10
      timing20
      timing50
      duration2
      duration5
      duration10
      duration20
      duration50
      frequency2
      frequency5
      frequency10
      frequency20
      frequency50
      magnitude2
      magnitude5
      magnitude10
      magnitude20
      magnitude50
      gaugeId
      updatedAt
      createdAt
    }
  }
  `;

  it("should contain all getWinter query fields", async () => {
    const fields = getFields(query, 4);

    const res = await graphql(schema, query);

    fields.forEach(
      field => expect(t(res.data.getWinter, field).isDefined).to.be.true
    );
  });
});
