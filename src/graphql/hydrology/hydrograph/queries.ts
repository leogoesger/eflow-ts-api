import { hydrographServices } from './services';

const service = new hydrographServices();

export interface IGetHydrographPL {
  id: number;
  type: 'CLASS' | 'GAUGE';
}

export const hydrographQueries = {
  getHydrograph: (_: any, { id, type }: IGetHydrographPL) =>
    service.getHydrograph(id, type),
};
