import { expect } from "chai";
import { graphql } from "graphql";

import { schema } from "../../../schema";
import { addMockFunction } from "../../../../utils/testHelpers";

describe("hydrograph typeDefs", () => {
  addMockFunction();

  const query = `
  query ($hydroInfo: IHydroInfo){
    getHydrograph(hydroInfo: $hydroInfo){
      gaugeId
      classId
      type
      drh {
        TEN
        TWENTYFIVE
        FIFTY
        SEVENTYFIVE
        NINTY
        MAX
        MIN
      }
    }
  }
  `;

  it("should contain all getHydrograph query fields", async () => {
    const res = await graphql(schema, query);
    expect(Boolean(res.data.getHydrograph.type)).to.be.true;
    expect(Boolean(res.data.getHydrograph.classId)).to.be.true;
    expect(Boolean(res.data.getHydrograph.drh)).to.be.true;
    expect(Boolean(res.data.getHydrograph.drh.TEN)).to.be.true;
    expect(Boolean(res.data.getHydrograph.drh.TWENTYFIVE)).to.be.true;
    expect(Boolean(res.data.getHydrograph.drh.FIFTY)).to.be.true;
    expect(Boolean(res.data.getHydrograph.drh.SEVENTYFIVE)).to.be.true;
    expect(Boolean(res.data.getHydrograph.drh.NINTY)).to.be.true;
    expect(Boolean(res.data.getHydrograph.drh.MAX)).to.be.true;
    expect(Boolean(res.data.getHydrograph.drh.MIN)).to.be.true;
    expect(Boolean(res.data.getHydrograph.gaugeId)).to.be.true;
  });
});
