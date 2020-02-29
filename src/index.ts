import express, { Request, Response } from 'express';

import Logger from 'Logger';

const app: express.Application = express();
const port: string = process.env.PORT || '3000';

app.use(express.json());
app.get('/health', (_, res: Response) => {
  Logger.info('health endpoint is called');

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

app.use((req: Request, res: Response) => {
  const message = `No route fond: ${req.path}`;
  Logger.info(message);
  res
    .status(404)
    .send({
      message,
    });
});

// To use as an error request handler, the function needs to have 4 arguments.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _: express.NextFunction) => {
  Logger.error(`Unexpected error! ${req.path}`);
  Logger.error(err);
  res
    .status(500)
    .send({
      message: 'Unexpected error occurred. Please retry after a while.',
    });
});

app.listen(port, () => {
  Logger.info(`Listening at http://localhost:${port}/`);
});
