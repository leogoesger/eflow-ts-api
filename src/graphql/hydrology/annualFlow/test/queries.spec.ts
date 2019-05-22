import { expect } from "chai";
import { annualFlowQueries } from "../queries";
import { IGaugeInfo } from "../../gauge/models";

describe("allyear queries", () => {
  it("should return allyear info", async () => {
    const gaugeInfo: IGaugeInfo = {
      gaugeId: 10295500,
      year: 1991
    };

    const res = await annualFlowQueries.getAnnualFlow(null, { gaugeInfo });
    expect(res.gaugeId).to.be.equals(10295500);
    expect(Boolean(res.year)).to.be.true;
    expect(Boolean(res.gaugeId)).to.be.true;
    expect(Boolean(res.flowData)).to.be.true;
  });
});
