import { Winter } from "../../../db/models";
import { IGaugeInfo } from "../../models";

import { metricReference } from "../../../static/metricReference";

export class WinterServices {
  Winter = Winter;

  public async getWinter(gaugeInfo: IGaugeInfo) {
    /**
     * Query Winter based on `gauge` type
     * @typedef {object} gaugeInfo
     * @property {number} gaugeId
     * @returns returns sequelize Promise
     */
    const { gaugeId } = gaugeInfo;
    try {
      const winterMetrics = Object.keys(metricReference)
        .filter(metric => metric.indexOf("Peak_") > -1)
        .map(m => metricReference[m][1]);

      const result = await this.Winter.findOne({
        where: { gaugeId },
        raw: true
      });
      winterMetrics.forEach((col, indx) => {
        if (result[col] !== null)
          result[col] = result[col].map(n => (isNaN(n) ? null : n));
        else result[col] = [null];
      });

      return result;
    } catch (e) {
      return `Gauge ${gaugeId} not found - ${e.toString()}`;
    }
  }
}
