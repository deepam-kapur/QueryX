import { COMMON_ERROR_MESSAGE, STATUS_CODES } from '../../../config/constants/error.status.js';
import ErrorHelpers from '../../../helpers/error.js';

const getPartitions = () => {

};

const createPartitions = (dbConnection, tableName, options = {}) => {
  if (!dbConnection) {
    throw ErrorHelpers.create(
      COMMON_ERROR_MESSAGE.db_connection_required,
      STATUS_CODES.ERROR.BAD_REQUEST,
      { tableName, options },
    );
  }
  if (!options || typeof options !== 'object' || Object.entries(options).length === 0) {
    throw ErrorHelpers.create(
      COMMON_ERROR_MESSAGE.partitions_options_required,
      STATUS_CODES.ERROR.BAD_REQUEST,
      { tableName, options },
    );
  }
};

export default {
  createPartitions,
};
