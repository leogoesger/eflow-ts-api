import { Hydrograph } from "../../../db/models";
import { IHydroInfo } from "../../models";

export class HydrographServices {
  Hydrograph = Hydrograph;

  public async getHydrograph(hydroInfo: IHydroInfo) {
    /**
     * Query Hydrograph based on `gauge` type or `class` type
     * @param  id integer
     * @param  type value can be `gauge` | `class`
     * @returns returns sequelize Promise
     */
    const { id, type } = hydroInfo;
    try {
      const query =
        type === "GAUGE"
          ? {
              gaugeId: id
            }
          : { classId: id };

      const results = await this.Hydrograph.findAll({
        where: query,
        raw: true
      });

      const result = { ...results[0] },
        drh: any = {};

      delete result.percentille;
      delete result.data;

      results.forEach(data => {
        drh[data.percentille] = data.data;
      });

      result.drh = drh;

      return result;
    } catch (e) {
      return `${type} ${id} not found - ${e.toString()}`;
    }
  }
}
