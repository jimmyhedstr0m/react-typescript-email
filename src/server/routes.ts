import express, { Router } from 'express';

import sendRoutes from './send/routes';
import templateRoutes from './templates/routes';

const router: Router = express.Router();

router.use('/send', sendRoutes);
router.use('/templates', templateRoutes);

export default router;
