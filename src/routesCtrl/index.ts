import { Router } from 'express';

import { ping } from './ping';
import { admin } from './admin/adminRoutes';
import { authorization } from '../middlewares';

const router = Router();

router.use('/api/ping', authorization('ADMIN'), ping);
router.use('/api/admin/', authorization('ADMIN'), admin);

export { router };
