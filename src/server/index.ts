import express, { Express } from 'express';
import bodyParser from 'body-parser';

import renderer from './preview';
import routes from './routes';

const app: Express = express();

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(process.env.RAZZLE_PUBLIC_DIR!));
app.set('json replacer', (_: any, value: any) => {
  if (typeof value === 'undefined') {
    return null;
  }
  return value;
});
app.use((err: express.Router, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    error: true
  });
});

app.use('/api/v1', routes);
app.get('/*', renderer);

export default app;