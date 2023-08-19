import MySQL from 'mysql2';
import Config from '../../config/index.js';
import { QUERYX_DB } from '../../config/constants/db.js';

const pool = MySQL.createPool({
    host: Config.DB_HOST,
    port: Config.DB_PORT,
    user: Config.DB_USERNAME,
    password: Config.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: Config.DB_POOL_CONNECTION_LIMIT || 5,
    queueLimit: 0,
});

pool.once('acquire', async (connection) =>{
    connection.query(`CREATE DATABASE IF NOT EXISTS ${QUERYX_DB}`);
});

pool.on('acquire', async (connection) => {
    connection.query(`USE ${QUERYX_DB}`);
});

const connection = () =>  pool.promise();

export default connection;