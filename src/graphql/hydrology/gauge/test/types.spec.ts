import { expect } from "chai";
import { graphql } from "graphql";
import t from "typy";
import { addMockFunction, getFields } from "../../../../utils/testHelpers";
import { schema } from "../../../schema";

describe("Gauge typeDefs", () => {
  addMockFunction();

  const arrayOfFields: any = [];

  const query = `
  query ($gaugeInfo : IGaugeInfo) {
    getGauge(gaugeInfo: $gaugeInfo) {
      id
      stationName
      unimpairedStartYear
      unimpairedEndYear
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
      geometry {
        type
        coordinates
      }
      hydrographs {
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
        gaugeId
      }
    }
  }
  `;

  it("should contain all getGauge query fields", async () => {
    const fields = getFields(query, 4);

    const res = await graphql(schema, query);

    fields.forEach(field => {
      expect(t(res.data.getGauge, field).isDefined).to.be.true;
    });
  });
});
