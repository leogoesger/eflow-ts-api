import { gaugeServices } from './services';
import { IGauge } from '../../../db/models';

const service = new gaugeServices();

export const gaugeMutations = {
  updateGauge: (_: any, { updateGaugePL }: { updateGaugePL: IGauge }) => {
    return service.updateGauge(updateGaugePL);
  },
};
