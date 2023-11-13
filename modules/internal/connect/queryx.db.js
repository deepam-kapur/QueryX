import { Sequelize } from 'sequelize';
import Config from '../../../config/index.js';
import { QUERYX_DB } from '../../../config/constants/db.js';

const pool = new Sequelize(QUERYX_DB, Config.DB_USERNAME, Config.DB_PASSWORD, {
  dialect: 'postgres',
  host: Config.DB_HOST,
  port: Config.DB_PORT,
  logging: console.log,
  pool: {
    max: Config.DB_POOL_CONNECTION_LIMIT || 5,
    min: 0,
    acquire: Config.DB_CONNECTION_TIMEOUT_MILLIS || 20000,
    idle: Config.DB_IDLE_TIMEOUT_MILLIS || 10000,
  },
});

export const checkDB = async () => {
  // Check if the database exists
  await pool.authenticate();
};

export default pool;
