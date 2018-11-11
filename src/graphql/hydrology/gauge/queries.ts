import { gaugeServices } from './services';
import { IPagePL } from '../../models';

const service = new gaugeServices();

export const gaugeQueries = {
  getGauges: (_: any, { pagePL }: { pagePL: IPagePL }) =>
    service.getGauges(pagePL),
  getGauge: (_: any, { id }: { id: number }) => service.getGauge(id),
};
