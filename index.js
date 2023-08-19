/* eslint-disable no-unused-vars */
import Express from 'express';

import Routers from './routes/index.js'
import InitializeDB from "./modules/initialization/init.js";
import Config from './config/index.js'

(async () => {
    InitializeDB();

    const app = Express();
    // Middleware
    app.use(Express.json());

    app.use('/', Routers);

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    });
  
    // Start the server
    app.listen(Config.PORT, () => {
        console.log(`Server running on port ${Config.PORT}`);
    });
})();
