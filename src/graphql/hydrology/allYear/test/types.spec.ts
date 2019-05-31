import { expect } from "chai";
import { graphql } from "graphql";
import t from "typy";

import { schema } from "../../../schema";
import { addMockFunction, getFields } from "../../../../utils/testHelpers";

describe("AllYear typeDefs", () => {
  addMockFunction();

  const query = `
  query ($gaugeInfo: IGaugeInfo){
    getAllYear(gaugeInfo: $gaugeInfo){
      gaugeId
      average
      standardDeviation
      id
      coeffientVariance
      createdAt
      updatedAt
    }
  }
  `;

  it("should contain all getAllYear query fields", async () => {
    const fields = getFields(query, 4);

    const res = await graphql(schema, query);

    fields.forEach(
      field => expect(t(res.data.getAllYear, field).isDefined).to.be.true
    );

    // expect(Boolean(res.data.getAllYear.id)).to.be.true;
    // expect(Boolean(res.data.getAllYear.gaugeId)).to.be.true;
    // expect(Boolean(res.data.getAllYear.average)).to.be.true;
    // expect(Boolean(res.data.getAllYear.standardDeviation)).to.be.true;
    // expect(Boolean(res.data.getAllYear.coeffientVariance)).to.be.true;
    // expect(Boolean(res.data.getAllYear.createdAt)).to.be.true;
    // expect(Boolean(res.data.getAllYear.updatedAt)).to.be.true;
  });
});
