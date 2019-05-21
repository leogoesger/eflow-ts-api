import { expect } from "chai";
import { springQueries } from "../queries";
import { IGaugeInfo } from "../../gauge/models";

describe("spring queries", () => {
  it("should return spring info", async () => {
    const gaugeInfo: IGaugeInfo = {
      gaugeId: 10295500
    };

    const res = await springQueries.getSpring(null, { gaugeInfo });
    expect(Boolean(res.id)).to.be.true;
    expect(Boolean(res.timing)).to.be.true;
    expect(Boolean(res.magnitude)).to.be.true;
    expect(Boolean(res.duration)).to.be.true;
    expect(Boolean(res.rateOfChange)).to.be.true;
    expect(Boolean(res.gaugeId)).to.be.true;
  });
});
