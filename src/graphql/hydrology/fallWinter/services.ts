import { FallWinter } from "../../../db/models";
import { IGaugeInfo } from "../../models";

import { metricReference } from "../../../static/metricReference";

export class FallWinterServices {
  FallWinter = FallWinter;

  public async getFallWinter(gaugeInfo: IGaugeInfo) {
    /**
     * Query FallWinter based on `gauge` type
     * @typedef {object} gaugeInfo
     * @property {number} gaugeId
     * @returns returns sequelize Promise
     */
    const { gaugeId } = gaugeInfo;
    try {
      const fallWinterMetrics = Object.keys(metricReference)
        .filter(metric => metric.indexOf("Wet_BFL_Mag") > -1)
        .map(m => metricReference[m][1]);

      const result = await this.FallWinter.findOne({
        where: { gaugeId },
        raw: true
      });
      fallWinterMetrics.forEach((col, indx) => {
        result[col] = result[col].map(n => (isNaN(n) ? null : n));
      });

      return result;
    } catch (e) {
      return `Gauge ${gaugeId} not found - ${e.toString()}`;
    }
  }
}
