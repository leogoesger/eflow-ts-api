import { classificationServices } from './services';

const service = new classificationServices();

export const classificationQueries = {
  getClassifications: () => service.getClassifications(),
  getClassification: (_: any, { id }: { id: number }) =>
    service.getClassification(id),
};
