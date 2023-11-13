import Express from 'express';

import ConnectionsControllers from '../../controllers/connections.ctrl.js';
import ConnectionsValidations from '../validations/connections.validations.js';
import Validations from '../validations/index.validations.js';

const router = Express.Router();

router.get('/', ConnectionsValidations.getConnections, Validations.handleValidationErrors, ConnectionsControllers.getConnections);
router.post('/', ConnectionsValidations.createConnection, Validations.handleValidationErrors, ConnectionsControllers.createConnection);
router.put('/', ConnectionsValidations.updateConnection, Validations.handleValidationErrors, ConnectionsControllers.updateConnection);
router.delete('/', ConnectionsValidations.deleteConnection, Validations.handleValidationErrors, ConnectionsControllers.deleteConnection);

export default router;
