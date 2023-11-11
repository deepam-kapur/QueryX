import PgSQL from 'pg';
import Config from '../../config/index.js';
import { QUERYX_DB } from '../../config/constants/db.js';
import Error from "../../helpers/error.js";

const pool = new PgSQL.Pool({
    host: Config.DB_HOST,
    port: Config.DB_PORT,
    user: Config.DB_USERNAME,
    password: Config.DB_PASSWORD,
    database: QUERYX_DB,
    max: Config.DB_POOL_CONNECTION_LIMIT || 5,
    idleTimeoutMillis: Config.DB_IDLE_TIMEOUT_MILLIS || 10000, // how long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: Config.DB_CONNECTION_TIMEOUT_MILLIS || 2000, // how long to wait for a connection to be established before throwing an error
    log: console.log
});

export const checkDB = async () => {
    // Check if the database exists
    const result = await pool.query(
        `SELECT datname FROM pg_catalog.pg_database WHERE datname = $1`,
        [QUERYX_DB]
    );

    if(!result?.rowCount){
        throw Error(`Create a database by name ${QUERYX_DB}!`, 401);
    }
};

export default pool;