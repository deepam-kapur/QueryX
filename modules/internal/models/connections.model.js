import { QueryTypes } from 'sequelize';

import QueryXDB from '../connect/queryx.db.js';

export const initiateConnectionsTable = async () => {
  await QueryXDB.query(`
       CREATE TABLE IF NOT EXISTS connections (
            id SERIAL PRIMARY KEY,
            display_name VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            host VARCHAR(255) NOT NULL DEFAULT '127.0.0.1',
            port VARCHAR(6) NOT NULL DEFAULT '0',
            username VARCHAR(255) NOT NULL,
            password VARCHAR(512) NOT NULL,
            deleted_at TIMESTAMP NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `, { type: QueryTypes.RAW });
  await QueryXDB.query('CREATE UNIQUE INDEX IF NOT EXISTS display_name_UNIQUE ON connections (display_name)', { type: QueryTypes.RAW });

  const [proname] = await QueryXDB.query(
    'SELECT proname FROM pg_proc WHERE proname = \'update_connections_updated_at\' AND pronamespace = \'public\'::regnamespace',
    { type: QueryTypes.SELECT },
  );
  if (!proname) {
    await QueryXDB.query(`
            CREATE OR REPLACE FUNCTION update_connections_updated_at()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = NOW();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql`, { type: QueryTypes.RAW });
  }

  const [tgname] = await QueryXDB.query(
    'SELECT tgname FROM pg_trigger WHERE tgname = \'connections_update_trigger\' AND tgrelid = \'public.connections\'::regclass',
    { type: QueryTypes.SELECT },
  );
  if (!tgname) {
    await QueryXDB.query(
      `CREATE TRIGGER connections_update_trigger
      BEFORE UPDATE ON public.connections
      FOR EACH ROW EXECUTE FUNCTION update_connections_updated_at();`,
      { type: QueryTypes.RAW },
    );
  }
};

const get = async (where = null, attributes = null) => QueryXDB.query(`
        SELECT ${attributes ? attributes.join(', ') : '*'} FROM connections
        WHERE deleted_at is null and ${!where?.length ? '1' : where.map((col) => `${col}=:${col}`).join(' and')}
    `, {
  type: QueryTypes.SELECT,
  replacements: where,
});

const create = async (data) => {
  const keys = Object.keys(data);
  return QueryXDB.query(`
        INSERT INTO connections (${keys.join(', ')})
        VALUES (:${keys.join(', :')})
    `, {
    type: QueryTypes.INSERT,
    replacements: data,
  });
};

const update = async (data, where) => QueryXDB.query(`
        UPDATE connections 
        SET ${Object.keys(data).map((ele) => `${ele}=:${ele}`).join(', ')}
        WHERE ${Object.keys(where).map((ele) => `${ele}=:${ele}`).join(' and')}
    `, {
  type: QueryTypes.UPDATE,
  replacements: {
    ...data,
    ...where,
  },
});

const del = async (connectionId) => QueryXDB.query(`
        UPDATE connections 
        SET deleted_at=now()
        WHERE id=:connectionId and deleted_at is null
    `, {
  type: QueryTypes.UPDATE,
  replacements: { connectionId },
});

export default {
  get,
  create,
  update,
  del,
};
