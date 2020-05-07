import express, { Router } from 'express';

import * as controller from './controller';

const router: Router = express.Router();

router.get('/', controller.getTemplates);
router.post('/:name', controller.getTemplate);

export default router;