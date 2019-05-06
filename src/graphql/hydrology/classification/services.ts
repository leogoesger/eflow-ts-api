import { Classification, Gauge } from '../../../db/models';

export class ClassificationServices {
  Classification = Classification;

  public getClassifications() {
    return this.Classification.findAll();
  }

  public getClassification(id: number) {
    return this.Classification.findByPk(id, {
      include: [{ model: Gauge, as: 'gauges' }],
    });
  }
}
