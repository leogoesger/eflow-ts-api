import { expect } from "chai";
import { IGaugeInfo } from "../../gauge/models";
import { winterQueries } from "../queries";

describe("winter queries", () => {
  it("should return winter info", async () => {
    const gaugeInfo: IGaugeInfo = {
      gaugeId: 10295500
    };

    const res = await winterQueries.getWinter(null, { gaugeInfo });
    expect(Boolean(res.id)).to.be.true;
    expect(Boolean(res.magnitude2)).to.be.true;
    expect(res.gaugeId).to.be.equals(10295500);
  });
});
