import express, { Request, Response } from 'express';

import { generateRequestId, getRequestId } from 'lib/requestId';
import { connectLogger } from 'lib/requestLogger';
import Logger from 'Logger';

const app: express.Application = express();
const port: string = process.env.PORT || '3000';

app.use(express.json());
app.use(generateRequestId());
app.use(connectLogger());

app.get('/health', (_, res: Response) => {
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
  const requestId = getRequestId(req);
  const message = `No route fond: ${req.path}`;
  Logger.info({ requestId }, message);
  res
    .status(404)
    .send({
      message,
    });
});

// To use as an error request handler, the function needs to have 4 arguments.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _: express.NextFunction) => {
  const requestId = getRequestId(req);
  Logger.error({ requestId }, `Unexpected error! ${req.path}`);
  Logger.error({ requestId }, err);
  res
    .status(500)
    .send({
      message: 'Unexpected error occurred. Please retry after a while.',
    });
});

app.listen(port, () => {
  Logger.info(`Listening at http://localhost:${port}/`);
});
