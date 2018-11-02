import { Router } from 'express';

import { uploadAnnualFlow } from './uploadAnnualFlow';
import { uploadMetricResult } from './uploadMetricResult';
import {
  uploadClassHydrograph,
  uploadGaugeHydrograph,
} from './uploadHydrograph';

const admin = Router();

admin.route('/uploadAnnualFlow').get(uploadAnnualFlow);
admin.route('/uploadMetricResult').get(uploadMetricResult);
admin.route('/uploadClassHydrograph').get(uploadClassHydrograph);
admin.route('/uploadGaugeHydrograph').get(uploadGaugeHydrograph);

export { admin };
