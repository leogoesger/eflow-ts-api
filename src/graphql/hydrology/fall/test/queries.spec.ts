import { expect } from "chai";
import { fallQueries } from "../queries";
import { IGaugeInfo } from "../../gauge/models";

describe("fall queries", () => {
  it("should return fall info", async () => {
    const gaugeInfo: IGaugeInfo = {
      gaugeId: 10295500
    };

    const res = await fallQueries.getFall(null, { gaugeInfo });
    expect(Boolean(res.id)).to.be.true;
    expect(Boolean(res.timing)).to.be.true;
    expect(Boolean(res.magnitude)).to.be.true;
    expect(Boolean(res.duration)).to.be.true;
    expect(Boolean(res.timingWet)).to.be.true;
    expect(Boolean(res.gaugeId)).to.be.true;
  });
});
