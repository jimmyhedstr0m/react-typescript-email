import express, { Express } from 'express';
import bodyParser from 'body-parser';

import template from './template';

const app: Express = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/template', template);

export default express()
  .use((req: express.Request, res: express.Response) => (app as any).handle(req, res))
  .listen(port, () => {
    console.log(`> Started on port ${port}`);
  })
  .on('error', (e) => {
    console.error(e.message);
    throw e;
  });