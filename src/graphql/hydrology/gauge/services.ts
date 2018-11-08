import { Gauge, IGauge, Hydrograph } from '../../../db/models';

export class gaugeServices {
  Gauge = Gauge;

  public getGauges() {
    return this.Gauge.findAll();
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
