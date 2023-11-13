import Log from '../../../helpers/log.js';
import { checkDB } from '../connect/queryx.db.js';

import { initiateConnectionsTable } from '../models/connections.model.js';

const initDB = async () => {
  await initiateConnectionsTable();

  Log.info('Initialized QueryX DB');
};

const initialize = async () => {
  await checkDB();
  await initDB();
};

export default initialize;
