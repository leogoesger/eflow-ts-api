import { Summer } from "../../../db/models";
import { IGaugeInfo } from "../../models";

import { metricReference } from "../../../static/metricReference";

export class SummerServices {
  Summer = Summer;

  public async getSummer(gaugeInfo: IGaugeInfo) {
    /**
     * Query Summer based on `gauge` type or `class` type
     * @typedef {object} gaugeInfo
     * @property {number} gaugeId
     * @returns returns sequelize Promise
     */
    const { gaugeId } = gaugeInfo;
    try {
      const summerMetrics = Object.keys(metricReference)
        .filter(metric => metric.indexOf("DS_") > -1)
        .map(m => metricReference[m][1]);

      const result = await this.Summer.findOne({
        where: { gaugeId },
        raw: true
      });
      summerMetrics.forEach((col, indx) => {
        result[col] = result[col].map(n => (isNaN(n) ? null : n));
      });

      return result;
    } catch (e) {
      return `Gauge ${gaugeId} not found - ${e.toString()}`;
    }
  }
}
