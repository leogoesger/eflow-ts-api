import { expect } from "chai";
import { summerQueries } from "../queries";
import { IGaugeInfo } from "../../gauge/models";

describe("summer queries", () => {
  it("should return summer info", async () => {
    const gaugeInfo: IGaugeInfo = {
      gaugeId: 10295500
    };

    const res = await summerQueries.getSummer(null, { gaugeInfo });
    expect(Boolean(res.id)).to.be.true;
    expect(Boolean(res.timing)).to.be.true;
    expect(Boolean(res.magnitude10)).to.be.true;
    expect(Boolean(res.magnitude50)).to.be.true;
    expect(Boolean(res.durationWet)).to.be.true;
    expect(Boolean(res.durationFlush)).to.be.true;
    expect(Boolean(res.noFlowCount)).to.be.true;
    expect(Boolean(res.gaugeId)).to.be.true;
  });
});
