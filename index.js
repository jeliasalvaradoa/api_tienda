import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import routerApi from './routes/index.js';
import { checkApiKey } from './middlewares/auth.handler.js';
import {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} from './middlewares/error.handler.js';

export const createApp = (services) => {
  const app = express();
  app.use(json());
  app.use(corsMiddleware());
  app.disable('x-powered-by');
  import('./utils/auth/index.js');

//   app.get('/', (req, res) => {
//     res.send(`
//     <h1>Mi servidor express</h1>
//  `);
//   });
app.use(express.static("public"));

// esta ruta es para un acceso con una apikey
  app.get('/nueva-ruta', checkApiKey, (req, res) => {
    res.send('Hola mi server en express');
  });

  routerApi(app,services);

  app.use(logErrors)
  app.use (ormErrorHandler)
  app.use(boomErrorHandler)
  app.use(errorHandler)

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
