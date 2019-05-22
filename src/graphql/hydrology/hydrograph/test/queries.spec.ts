import { expect } from "chai";
import { hydrographQueries } from "../queries";
import { IHydroInfo } from "../../../models";

describe("hydrograph queries", () => {
  it("should return hydrograph info", async () => {
    const hydroInfo: IHydroInfo = {
      type: "GAUGE",
      id: 10295500
    };

    const res = await hydrographQueries.getHydrograph(null, { hydroInfo });
    expect(Boolean(res.id)).to.be.true;
    expect(Boolean(res.drh)).to.be.true;
    expect(Boolean(res.type)).to.be.true;
    expect(Boolean(res.gaugeId)).to.be.true;
    expect(Boolean(res.classId)).to.be.false;
    expect(Boolean(res.drh.TEN)).to.be.true;
    expect(Boolean(res.drh.TWENTYFIVE)).to.be.true;
    expect(Boolean(res.drh.FIFTY)).to.be.true;
    expect(Boolean(res.drh.SEVENTYFIVE)).to.be.true;
    expect(Boolean(res.drh.NINTY)).to.be.true;
    expect(Boolean(res.drh.MAX)).to.be.true;
    expect(Boolean(res.drh.MIN)).to.be.true;
  });
});
