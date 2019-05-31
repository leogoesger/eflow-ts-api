import { expect } from "chai";
import { IGaugeInfo } from "../models";
import { conditionQueries } from "../queries";

describe("Condition queries", () => {
  const gaugeInfo: IGaugeInfo = {
    gaugeId: 10295500,
    year: 1992
  };

  it("should return condition info for one year", async () => {
    const res = await conditionQueries.getCondition(null, { gaugeInfo });
    expect(res.gaugeId).to.be.equals(10295500);
    expect(res.conditions.length).to.be.equals(1);
    expect(Object.keys(res).length).equals(6);
  });

  it("should return all gauges info", async () => {
    const res = await conditionQueries.getConditions(null, { gaugeInfo });
    expect(res.gaugeId).equals(10295500);
    expect(res.conditions.length).equals(2);
  });
});
