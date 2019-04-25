import { Router } from 'express';

import { ping } from './ping';
import { admin } from './admin/adminRoutes';
import { authorization } from '../middlewares';

const router = Router();

router.use('/ts-api/ping', ping);
router.use('/ts-api/admin/', authorization('ADMIN'), admin);

export { router };
