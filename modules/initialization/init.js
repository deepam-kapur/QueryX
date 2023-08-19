import QueryXDB from '../common/queryx.db.js'

const _initDB = async () => {
    const connection = QueryXDB();

    // connection.query(`CREATE TABLE `);
    console.log('Initialized')
};

const initialize = async () => {
    await _initDB();
};

export default initialize;