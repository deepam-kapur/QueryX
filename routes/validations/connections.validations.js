import { body, param } from 'express-validator';

import CommonConstants from '../../config/constants/common.constants.js';

const connectionTypes = Object.values(CommonConstants.CONNECTION_TYPES);

const getConnections = [
  param('connection_id').isInt(),
  param('display_name').isString().trim(),
];

// Validation
const createConnection = [
  body('display_name').isString().trim().notEmpty()
    .withMessage('Display Name must be present'),
  body('type').isString().trim().notEmpty()
    .isIn(connectionTypes)
    .withMessage(`Type must be one of ${connectionTypes.join(', ')}`),
  body('host').isString().trim().notEmpty()
    .withMessage('Host must be present'),
  body('port').isInt({ min: 0, max: 65535 })
    .withMessage('Port must be present and in between 0 - 65535'),
  body('username').isString().trim().notEmpty()
    .withMessage('Username must be present'),
  body('password').isString().trim(),
];

const updateConnection = [
  body('connection_id').isInt().notEmpty()
    .withMessage('Connection id must be provided'),
  body('display_name').isString().trim(),
  body('type').isString().trim().isIn(connectionTypes),
  body('host').isString().trim(),
  body('port').isInt({ min: 0, max: 65535 }),
  body('username').isString().trim(),
  body('password').isString().trim(),
];

const deleteConnection = [
  body('connection_id').isInt().notEmpty()
    .withMessage('Connection id must be provided'),
];

export default {
  getConnections,
  createConnection,
  updateConnection,
  deleteConnection,
};
