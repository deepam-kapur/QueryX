import ConnectionsSvc from '../services/connections.svc.js';

import Log from '../helpers/log.js';
import ResponseUtils from '../helpers/response.js';

const getConnections = async (req, res) => {
  try {
    const {
      display_name: displayName,
      connection_id: connectionId,
    } = req.query;

    const result = await ConnectionsSvc.getConnections(displayName, connectionId);

    const payload = {
      length: result?.length || 0,
      data: result,
    };
    return ResponseUtils.success(res, payload);
  } catch (e) {
    Log.errorRequest(e, req);
    return ResponseUtils.error(res, e);
  }
};

const createConnection = async (req, res) => {
  try {
    const {
      display_name: displayName, type, host, port, username, password,
    } = req.body;

    await ConnectionsSvc.createConnection(displayName, type, host, port, username, password);

    return ResponseUtils.success(res);
  } catch (e) {
    Log.errorRequest(e, req);
    return ResponseUtils.error(res, e);
  }
};

const updateConnection = async (req, res) => {
  try {
    const {
      connection_id: connectionId, display_name: displayName, type, host, port, username, password,
    } = req.body;

    await ConnectionsSvc.updateConnection(connectionId, displayName, type, host, port, username, password);

    return ResponseUtils.success(res);
  } catch (e) {
    Log.errorRequest(e, req);
    return ResponseUtils.error(res, e);
  }
};

const deleteConnection = async (req, res) => {
  try {
    const { connection_id: connectionId } = req.body;

    await ConnectionsSvc.deleteConnection(connectionId);

    return ResponseUtils.success(res);
  } catch (e) {
    Log.errorRequest(e, req);
    return ResponseUtils.error(res, e);
  }
};

export default {
  getConnections,
  createConnection,
  updateConnection,
  deleteConnection,
};
