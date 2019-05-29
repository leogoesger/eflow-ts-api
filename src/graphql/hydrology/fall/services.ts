import { Fall } from "../../../db/models";
import { IGaugeInfo } from "../../models";

import { metricReference } from "../../../static/metricReference";

export class FallServices {
  Fall = Fall;

  public async getFall(gaugeInfo: IGaugeInfo) {
    /**
     * Query Fall based on `gauge` type or `class` type
     * @typedef {object} gaugeInfo
     * @property {number} gaugeId
     * @returns returns sequelize Promise
     */
    const { gaugeId } = gaugeInfo;
    try {
      const fallMetrics = Object.keys(metricReference)
        .filter(
          metric =>
            metric.indexOf("WSI_") > -1 || metric.indexOf("Wet_Tim") > -1
        )
        .map(m => metricReference[m][1]);

      const result = await this.Fall.findOne({
        where: { gaugeId },
        raw: true
      });
      fallMetrics.forEach((col, indx) => {
        result[col] = result[col].map(n => (isNaN(n) ? null : n));
      });

      return result;
    } catch (e) {
      return `Gauge ${gaugeId} not found - ${e.toString()}`;
    }
  }
}
