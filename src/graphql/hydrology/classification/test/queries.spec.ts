import { expect } from "chai";
import { classes } from "../../../../static/allClasses";
import { classificationQueries } from "../queries";

describe("classifications queries", () => {
  it("should return class 1 info", async () => {
    const res = await classificationQueries.getClassification(null, { id: 1 });
    expect(res.id).to.be.equals(1);
    expect(Object.keys(res.dataValues).length).equals(40);
    expect(Object.keys(res.gauges).length).equals(23);
  });

  it("should return all classes info", async () => {
    const res = await classificationQueries.getClassifications();
    expect(res.length).equals(9);
    classes.forEach((cls, indx) => {
      expect(res[indx].dataValues.name).equals(cls.fullName);
    });
  });
});
