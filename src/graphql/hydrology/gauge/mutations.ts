import { GaugeServices } from './services';
import { IGauge } from '../../../db/models';

const service = new GaugeServices();

export const gaugeMutations = {
  updateGauge: (_: any, { updateGaugePL }: { updateGaugePL: IGauge }) => {
    return service.updateGauge(updateGaugePL);
  },
};
