import { Condition, IGaugeInfo, Year } from "./models";

export class ConditionServices {
  Condition = Condition;
  Year = Year;

  public async getConditions(gaugeInfo: IGaugeInfo) {
    try {
      const result = await this.Condition.findOne({
        where: { gaugeId: gaugeInfo.gaugeId },
        raw: true
      });

      result.conditions = result.conditions.map(condition =>
        condition === "NOT AVAILABLE" ? "NA" : condition
      );

      return result;
    } catch (e) {
      return `Could not process request! Error: ${e.toString()}`;
    }
  }

  public async getCondition(gaugeInfo: IGaugeInfo) {
    try {
      const allYears = await this.Year.findOne({
        where: { gaugeId: gaugeInfo.gaugeId },
        raw: true
      });
      const yearIndx = allYears.year.findIndex(year => year === gaugeInfo.year);

      if (yearIndx === -1)
        return `Condition for year: ${gaugeInfo.year} not found!`;

      const result = await this.Condition.findOne({
        where: { gaugeId: gaugeInfo.gaugeId },
        raw: true
      });

      result.conditions = result.conditions
        .slice(yearIndx, yearIndx + 1)
        .map(condition => (condition === "NOT AVAILABLE" ? "NA" : condition));

      result.year = gaugeInfo.year;

      return result;
    } catch (e) {
      return `Could not process request! Error: ${e.toString()}`;
    }
  }
}
