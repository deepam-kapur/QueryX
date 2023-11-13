const COMMON_ERROR_MESSAGE = {
  db_connection_required: 'DB Connection is required',
  partitions_options_required: 'Partitions Options Required',
};

const STATUS_CODES = {
  ERROR: {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    DEFAULT: 500,
    FORBIDDEN: 403,
  },
  SUCCESS: 200,
};

export {
  COMMON_ERROR_MESSAGE,
  STATUS_CODES,
};

export default {
  COMMON_ERROR_MESSAGE,
  STATUS_CODES,
};
