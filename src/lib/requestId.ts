/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  RequestHandler, Request, Response, NextFunction,
} from 'express';
import { v4 as uuid } from 'uuid';

const ATTRIBUTE = '_requestId';

const generateRequestId = (): RequestHandler => (req: Request, _: Response, next: NextFunction) => {
  // @ts-ignore
  req[ATTRIBUTE] = uuid();
  next();
};

// @ts-ignore
const getRequestId = (req: Request): string => req[ATTRIBUTE];

export {
  generateRequestId,
  getRequestId,
};
