import { ClassificationServices } from './services';

const service = new ClassificationServices();

export const classificationQueries = {
  getClassifications: () => service.getClassifications(),
  getClassification: (_: any, { id }: { id: number }) =>
    service.getClassification(id),
};
