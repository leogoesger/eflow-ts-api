import { expect } from "chai";
import { allYearQueries } from "../queries";
import { IGaugeInfo } from "../../gauge/models";

describe("allyear queries", () => {
  it("should return allyear info", async () => {
    const gaugeInfo: IGaugeInfo = {
      gaugeId: 10295500
    };

    const res = await allYearQueries.getAllYear(null, { gaugeInfo });
    expect(res.gaugeId).to.be.equals(10295500);
    expect(Boolean(res.id)).to.be.true;
    expect(Boolean(res.gaugeId)).to.be.true;
    expect(Boolean(res.average)).to.be.true;
    expect(Boolean(res.standardDeviation)).to.be.true;
    expect(Boolean(res.coeffientVariance)).to.be.true;
    expect(Boolean(res.createdAt)).to.be.true;
    expect(Boolean(res.updatedAt)).to.be.true;
  });
});
