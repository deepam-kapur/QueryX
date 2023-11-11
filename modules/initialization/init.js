import QueryXConnection, {checkDB,} from '../common/queryx.db.js'

const _initiateConnectionsTable = async (connection) => {
    await connection.query(`
       CREATE TABLE IF NOT EXISTS connections (
            id SERIAL PRIMARY KEY,
            display_name VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            host VARCHAR(255) NOT NULL DEFAULT '127.0.0.1',
            port VARCHAR(6) NOT NULL DEFAULT '0',
            username VARCHAR(255) NOT NULL,
            password VARCHAR(512) NOT NULL,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP NOT NULL
        )
    `);
    await connection.query(`CREATE UNIQUE INDEX IF NOT EXISTS display_name_UNIQUE ON connections (display_name)`);
}

const _initDB = async () => {
    const connection = QueryXConnection;
    await _initiateConnectionsTable(connection);
    
    console.log('Initialized QueryX DB');
};

const initialize = async () => {
    await checkDB()
    await _initDB();
};

export default initialize;