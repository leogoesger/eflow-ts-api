import { AllYear } from '../../../db/models';

export interface IValidatePayload {
  gaugeNum: number;
  yearNum: number;
}

export class allYearServices {
  AllYear = AllYear;

  public getAllYear(id: number) {
    return this.AllYear.find({
      where: { gaugeId: id },
    });
  }

  public async validate(d: IValidatePayload): Promise<Boolean> {
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
