import { expect } from "chai";
import { graphql } from "graphql";

import { addMockFunction } from "../../../../utils/testHelpers";
import { schema } from "../../../schema";

describe("Classfications typeDefs", () => {
  addMockFunction();

  const query = `
  query getClassfication($input : Int) {
    getClassification(id: $input) {
      id
      name
      description
      abbreviation
      Avg
      Std
      CV
      SP_Tim
      SP_Mag
      SP_Dur
      SP_ROC
      DS_Tim
      DS_Mag_10
      DS_Mag_50
      DS_Dur_WSI
      DS_Dur_WS
      DS_No_Flow
      WSI_Tim
      WSI_Mag
      Wet_Tim
      WSI_Dur
      Wet_BFL_Mag
      Peak_Tim_2
      Peak_Dur_2
      Peak_Fre_2
      Peak_Tim_5
      Peak_Dur_5
      Peak_Fre_5
      Peak_Tim_10
      Peak_Dur_10
      Peak_Fre_10
      Peak_Tim_20
      Peak_Dur_20
      Peak_Fre_20
      Peak_Tim_50
      Peak_Dur_50
      Peak_Fre_50
      createdAt
      updatedAt
    }
  }
  `;

  it("should contain all getClassification query fields", async () => {
    const res = await graphql(schema, query);

    query
      .split("\n")
      .slice(3)
      .forEach(field => {
        field = field.split("}")[0].trim();
        if (field !== "")
          expect(Boolean(res.data.getClassification[field])).to.be.true;
      });
  });
});
