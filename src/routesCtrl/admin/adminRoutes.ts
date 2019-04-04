import { Router } from 'express';

import { uploadAnnualFlow } from './uploadAnnualFlow';
import { uploadMetricResult } from './uploadMetricResult';
import {
  uploadClassHydrograph,
  uploadGaugeHydrograph,
} from './uploadHydrograph';
import { uploadCondition } from "./uploadAnnualCondition";

const admin = Router();

admin.route('/uploadAnnualFlow').get(uploadAnnualFlow);
admin.route('/uploadMetricResult').get(uploadMetricResult);
admin.route('/uploadClassHydrograph').get(uploadClassHydrograph);
admin.route('/uploadGaugeHydrograph').get(uploadGaugeHydrograph);
admin.route('/uploadAnnualConditions').get(uploadCondition);

export { admin };
