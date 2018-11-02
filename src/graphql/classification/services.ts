import { Classification, Gauge } from '../../db/models';

export class classificationServices {
  Classification = Classification;

  public getClassifications() {
    return this.Classification.findAll();
  }

  public getClassification(id: number) {
    return this.Classification.findById(id, {
      include: [{ model: Gauge, as: 'gauges' }],
    });
  }
}
