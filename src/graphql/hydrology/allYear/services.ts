import { AllYear } from '../../../db/models';

export interface IValidatePayload {
  gaugeNum: number;
  yearNum: number;
}

export class AllYearServices {
  AllYear = AllYear;

  public getAllYear(id: number) {
    return this.AllYear.findOne({
      where: { gaugeId: id },
    });
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
