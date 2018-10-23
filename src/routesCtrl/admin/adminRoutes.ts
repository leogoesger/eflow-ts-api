import { Router } from 'express';

import { uploadAnnualFlow } from './uploadAnnualFlow';
import { uploadMetricResult } from './uploadMetricResult';

const admin = Router();

admin.route('/uploadAnnualFlow').get(uploadAnnualFlow);
admin.route('/uploadMetricResult').get(uploadMetricResult);

export { admin };
