import { Gauge, IGauge } from '../../models';

export class gaugeServices {
  Gauge = Gauge;

  public getGauges() {
    return this.Gauge.findAll();
  }

  public getGauge(id: number) {
    return this.Gauge.findById(id);
  }

  public async updateGauge(d: IGauge) {
    const gauge = await this.Gauge.findById(d.id);
    return gauge.updateAttributes(d);
  }
}
