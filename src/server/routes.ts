import express, { Router } from 'express';

import templateRoutes from './templates/routes';

const router: Router = express.Router();

router.use('/templates', templateRoutes);

export default router;
