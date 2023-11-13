import Connections from '../modules/internal/models/connections.model.js';
import ErrorHelper from '../helpers/error.js';

const createConnection = async (displayName, type, host, port, username, password) => {
  const connectionsData = await Connections.get({ display_name: displayName }, ['display_name']);
  if (connectionsData?.length) {
    throw ErrorHelper.create('Connection with display name already exists. It should be unique', 400);
  }

  const query = {
    display_name: displayName,
    type,
    host,
    port,
    username,
    ...(password && { password }),
  };

  return Connections.create(query);
};

const getConnections = async (displayName, connectionId) => {
  const whereQuery = {
    ...(displayName && { display_name: displayName }),
    ...(connectionId && { id: connectionId }),
  };

  return Connections.get(
    whereQuery,
    ['display_name', 'type', 'host', 'port', 'username'],
  );
};

const updateConnection = async (connectionId, displayName, type, host, port, username, password) => {
  const connectionsData = await Connections.get({ id: connectionId }, ['id']);
  if (!connectionsData?.length) {
    throw ErrorHelper.create('Connection doesn\'t exist', 400);
  }

  const query = {
    ...(displayName && { display_name: displayName }),
    ...(type && { type }),
    ...(host && { host }),
    ...(port && { port }),
    ...(username && { username }),
    ...(password && { password }),
  };
  if (!query.length) {
    throw ErrorHelper.create('Nothing to update in the connections', 400);
  }

  return Connections.update(query, { id: connectionId });
};

const deleteConnection = async (connectionId) => Connections.del(connectionId);

export default {
  createConnection,
  getConnections,
  updateConnection,
  deleteConnection,
};
