import { Hydrograph } from '../../../db/models';

export class HydrographServices {
  Hydrograph = Hydrograph;

  public getHydrograph(id: number, type: 'GAUGE' | 'CLASS') {
    /**
     * Query Hydrograph based on `gauge` type or `class` type
     * @param  id integer
     * @param  type value can be `gauge` | `class`
     * @returns returns sequelize Promise
     */
    const query =
      type === 'GAUGE'
        ? {
            gaugeId: id,
          }
        : { classId: id };
    return this.Hydrograph.findOne({
      where: query,
    });
  }
}
