import { expect } from "chai";
import { gauges } from "../../../../static/allGauges";
import { IGaugeInfo, IPagePL } from "../models";
import { gaugeQueries } from "../queries";

describe("Gauges queries", () => {
  const gaugeInfo: IGaugeInfo = {
    gaugeId: 10295500
  };

  const pagePL: IPagePL = {
    offset: 0,
    limit: 223
  };

  it("should return gauge 1 info", async () => {
    const res = await gaugeQueries.getGauge(null, { gaugeInfo });
    expect(res.id).to.be.equals(10295500);
    expect(Object.keys(res).length).equals(46);
  });

  it("should return all gauges info", async () => {
    const res = await gaugeQueries.getGauges(null, { pagePL });
    expect(res.length).equals(223);
    gauges.forEach((gauge, indx) => {
      expect(res[indx].dataValues.id).equals(gauge.id);
      expect(res[indx].dataValues.unimpairedStartYear).equals(
        gauge.unimpairedStartYear
      );
      expect(res[indx].dataValues.unimpairedEndYear).equals(
        gauge.unimpairedEndYear
      );
    });
  });
});
