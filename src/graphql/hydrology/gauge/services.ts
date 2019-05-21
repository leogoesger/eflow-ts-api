import { IPagePL, Gauge, IGauge, Hydrograph, IGaugeInfo } from "./models";

export class GaugeServices {
  Gauge = Gauge;

  public getGauges(pagePL: IPagePL) {
    if (!pagePL) {
      return this.Gauge.findAll();
    }
    const { limit, offset } = pagePL;
    return this.Gauge.findAll({ offset, limit });
  }

  public async getGauge(gaugeInfo: IGaugeInfo) {
    const result = await this.Gauge.findByPk(gaugeInfo.gaugeId, {
      include: [{ model: Hydrograph, as: "hydrographs" }]
    });

    const data = result.get({ plain: true });

    const hydro = { ...data.hydrographs[0] },
      drh: any = {};

    delete hydro.percentille;
    delete hydro.data;

    data.hydrographs.forEach(d => {
      drh[d.percentille] = d.data;
    });

    delete data.hydrographs;
    hydro.drh = drh;
    data.hydrographs = hydro;

    return data;
  }

  public async updateGauge(d: IGauge) {
    const gauge = await this.Gauge.findByPk(d.id);
    return gauge.updateAttributes(d);
  }

  public async deleteGauge(gaugeInfo: IGaugeInfo) {
    return this.Gauge.findByPk(gaugeInfo.gaugeId).then(d => d.destroy());
  }
}
