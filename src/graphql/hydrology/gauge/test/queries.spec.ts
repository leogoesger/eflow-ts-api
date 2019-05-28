import { expect } from "chai";
import { classes } from "../../../../static/allClasses";
import { IGaugeInfo, IPagePL } from "../models";
import { gaugeQueries } from "../queries";

describe("Gauges queries", () => {
  const gaugeInfo: IGaugeInfo = {
    gaugeId: 10295500
  };

  const pagePL: IPagePL = {
    offset: 10,
    limit: 10
  };

  it("should return class 1 info", async () => {
    const res = await gaugeQueries.getGauge(null, { gaugeInfo });
    expect(res.id).to.be.equals(1);
    expect(Object.keys(res.dataValues).length).equals(40);
    expect(Object.keys(res.gauges).length).equals(23);
  });

  it("should return all classes info", async () => {
    const res = await gaugeQueries.getGauges(null, { pagePL });
    expect(res.length).equals(9);
    classes.forEach((cls, indx) => {
      expect(res[indx].dataValues.name).equals(cls.fullName);
    });
  });
});
