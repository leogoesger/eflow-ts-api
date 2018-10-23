import { Router } from 'express';

import { ping } from './ping';
import { admin } from './admin/adminRoutes';

const router = Router();

router.use('/api/ping', ping);
router.use('/api/admin/', admin);

export { router };
