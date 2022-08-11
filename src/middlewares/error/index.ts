import { Application } from 'express';
import * as httpStatus from 'http-status';
import ApiError from '../../utils/ApiError';
import { errorHandler } from './error';
export default (app: Application) => {
  app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Requested Resourse Was Not Found'));
  });
  app.use(errorHandler);
};
