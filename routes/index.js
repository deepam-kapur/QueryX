import Express from 'express';

import ConnectionsRoutes from './api/connections.routes.js';

const router = Express.Router();

const BASE_URI = '/api/v1';

router.use(`${BASE_URI}/connections`, ConnectionsRoutes);

export default router;
