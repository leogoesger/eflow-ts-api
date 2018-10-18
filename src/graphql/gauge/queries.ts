import { gaugeServices } from './services';

const service = new gaugeServices();

export const gaugeQueries = {
  getGauges: () => service.getGauges(),
  getGauge: (_: any, { id }: { id: number }) => service.getGauge(id),
};
