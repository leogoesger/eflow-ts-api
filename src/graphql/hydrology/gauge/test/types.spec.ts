import { expect } from "chai";
import { graphql } from "graphql";
import t from "typy";

import { addMockFunction } from "../../../../utils/testHelpers";
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
        gaugeId
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
  }
  `;

  it("should contain all getGauge query fields", async () => {
    const fields = getFields();

    const res = await graphql(schema, query);

    fields.forEach(field => {
      expect(t(res.data.getGauge, field).isDefined).to.be.true;
    });
  });

  function getFields() {
    const fields = query.split("\n").slice(3);

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i].split("}")[0].trim();
      if (field.indexOf("{") > -1) {
        const nestedField = field.split("{")[0].trim();
        arrayOfFields.push(nestedField);
        i = getNestedFields(fields, nestedField, ++i, fields.length);
      } else if (field !== "") arrayOfFields.push(field);
    }

    return arrayOfFields;
  }

  function getNestedFields(fields, field, i, len) {
    const f = fields[i].trim();

    if (i < len) {
      if (f.indexOf("{") > -1) {
        const nestedField = field + "." + f.split("{")[0].trim();
        arrayOfFields.push(nestedField);
        return getNestedFields(fields, nestedField, ++i, len);
      } else if (f !== "}") {
        arrayOfFields.push(field + "." + f);
        return getNestedFields(fields, field, ++i, len);
      } else return i;
    }

    return i;
  }
});
