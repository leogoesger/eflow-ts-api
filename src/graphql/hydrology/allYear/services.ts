import { AllYear } from "../../../db/models";

export interface IValidatePayload {
  gaugeNum: number;
  yearNum: number;
}

const columns = ["average", "coeffientVariance", "standardDeviation"];

export class AllYearServices {
  AllYear = AllYear;

  public async getAllYear(id: number) {
    const result = await this.AllYear.findOne({
      where: { gaugeId: id },
      raw: true
    });
    columns.forEach((col, indx) => {
      result[col] = result[col].map(n => (isNaN(n) ? null : n));
    });
    return result;
  }

  public async validate(d: IValidatePayload): Promise<boolean> {
    const allYears = await AllYear.findAll();
    const nonValid = allYears.some(item => {
      return (
        item.average.length !== d.yearNum ||
        item.standardDeviation.length !== d.yearNum ||
        item.coeffientVariance.length !== d.yearNum
      );
    });
    return allYears.length === d.gaugeNum && !nonValid;
  }
}
