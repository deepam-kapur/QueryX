import QueryXDB from '../common/queryx.db.js'

const _initiateConnectionsTable = async (connection) => {
    await connection.query(`
       CREATE TABLE IF NOT EXISTS connections (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        display_name VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        host VARCHAR(255) NOT NULL DEFAULT '127.0.0.1',
        port VARCHAR(6) NOT NULL DEFAULT 0,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(512) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL,
        PRIMARY KEY (id),
        UNIQUE INDEX display_name_UNIQUE (display_name ASC) VISIBLE)
    `);
}

const _initDB = async () => {
    const connection = QueryXDB();
    await _initiateConnectionsTable(connection);
    
    console.log('Initialized QueryX DB');
};

const initialize = async () => {
    await _initDB();
};

export default initialize;