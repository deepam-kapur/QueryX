import Express from 'express';

import Routers from './routes/index.js';
import InitializeDB from './modules/internal/initialization/init.js';
import Config from './config/index.js';

import Response from './helpers/response.js';
import Log from './helpers/log.js';

(async () => {
  await InitializeDB();

  const app = Express();

  // Middleware
  app.use(Express.json());

  app.use('/', Routers);

  // Error handling middleware
  app.use((err, req, res, next) => {
    Log.errorRequest(err, req);
    return Response.error(res, null, 'Internal Server Error', 500);
  });

  // Start the server
  app.listen(Config.PORT, () => Log.info(`Server running on port ${Config.PORT}`));
})();
