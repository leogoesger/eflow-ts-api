import { Classification } from '../../db/models';

export class classificationServices {
  Classification = Classification;

  public getClassifications() {
    return this.Classification.findAll();
  }

  public getClassification(id: number) {
    return this.Classification.findById(id);
  }
}
