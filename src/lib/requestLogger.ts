import {
  RequestHandler, Request, Response, NextFunction,
} from 'express';

import { getRequestId } from 'lib/requestId';
import Logger from 'Logger';

export const connectLogger = ():RequestHandler => (req: Request, _: Response, next: NextFunction): void => {
  const requestId = getRequestId(req);
  Logger.info({ requestId }, req.originalUrl, `Started ${req.method} ${req.originalUrl}`);
  next();
};
