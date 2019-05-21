import { Spring } from "../../../db/models";
import { IGaugeInfo } from "../../models";

import { metricReference } from "../../../static/metricReference";

export class SpringServices {
  Spring = Spring;

  public async getSpring(gaugeInfo: IGaugeInfo) {
    /**
     * Query Spring based on `gauge` type or `class` type
     * @typedef {object} gaugeInfo
     * @property {number} gaugeId
     * @returns returns sequelize Promise
     */
    const { gaugeId } = gaugeInfo;
    try {
      const springMetrics = Object.keys(metricReference)
        .filter(metric => metric.indexOf("SP_") > -1)
        .map(m => metricReference[m][1]);

      const result = await this.Spring.findOne({
        where: { gaugeId },
        raw: true
      });
      springMetrics.forEach((col, indx) => {
        result[col] = result[col].map(n => (isNaN(n) ? null : n));
      });

      return result;
    } catch (e) {
      return `Gauge ${gaugeId} not found - ${e.toString()}`;
    }
  }
}
