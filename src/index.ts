import express from 'express';

import server from './server';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

let app = server;

if (module.hot) {
  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    try {
      app = require('./server').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

export default express()
  .use((req: express.Request, res: express.Response) => (app as any).handle(req, res))
  .listen(port, () => {
    console.log(`> Started on port ${port}`);
  })
  .on('error', (e) => {
    console.error(e.message);
    throw e;
  });