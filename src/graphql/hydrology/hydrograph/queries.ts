import { HydrographServices } from './services';

const service = new HydrographServices();

export interface IGetHydrographPL {
  id: number;
  type: 'CLASS' | 'GAUGE';
}

export const hydrographQueries = {
  getHydrograph: (_: any, { id, type }: IGetHydrographPL) =>
    service.getHydrograph(id, type),
};
