import { validationResult } from 'express-validator';
import Response from '../../helpers/response.js';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return Response.error(res, errors.array(), 'Validation Error');
  }
  return next();
};

export default {
  handleValidationErrors,
};
