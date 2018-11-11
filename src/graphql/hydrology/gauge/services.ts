import { IPagePL, Gauge, IGauge, Hydrograph } from './models';

export class gaugeServices {
  Gauge = Gauge;

  public getGauges(pagePL: IPagePL) {
    if (!pagePL) {
      return this.Gauge.findAll();
    }
    const { limit, offset } = pagePL;
    return this.Gauge.findAll({ offset, limit });
  }

  public getGauge(id: number) {
    return this.Gauge.findById(id, {
      include: [{ model: Hydrograph, as: 'hydrographs' }],
    });
  }

  public async updateGauge(d: IGauge) {
    const gauge = await this.Gauge.findById(d.id);
    return gauge.updateAttributes(d);
  }

  public async deleteGauge(id: number) {
    return this.Gauge.findById(id).then(d => d.destroy());
  }
}
