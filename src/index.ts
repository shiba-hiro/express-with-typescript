import express, { Response } from 'express';

import Logger from './Logger';

const app: express.Application = express();
const port: string = process.env.PORT || '3000';

app.use(express.json());
app.get('/health-check', (_, res: Response) => {
  Logger.info('health-check endpoint is called');

  const appState = {
    message: 'Application is running.',
    success: true,
  };

  res
    .status(200)
    .send({
      app: appState,
    });
});

app.listen(port, () => {
  Logger.info(`Listening at http://localhost:${port}/`);
});
