import type { ErrorRequestHandler } from 'express';
import { AppError } from '../errors';
import type { TErrorSources } from '@/interface';

import {
  handleCastError,
  handlerDuplicateError,
  handlerValidationError,
  handlerZodError,
} from '@/shared';
import config from '@/config';

export const globalErrorHandler: ErrorRequestHandler = async (
  err,
  req,
  res,
  next
) => {
  let errorSources: Array<TErrorSources> = [];
  let status = 500;
  let message = 'Something Went Wrong!!';

  //Duplicate error
  if (err.code === 11000) {
    const simplifiedError = handlerDuplicateError(err);
    status = simplifiedError.status;
    message = simplifiedError.message;
  }

  // Object ID error / Cast Error
  else if (err.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    status = simplifiedError.status;
    message = simplifiedError.message;
  } else if (err.name === 'ZodError') {
    const simplifiedError = handlerZodError(err);
    status = simplifiedError.status;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as Array<TErrorSources>;
  }

  //Mongoose Validation Error
  else if (err.name === 'ValidationError') {
    const simplifiedError = handlerValidationError(err);
    status = simplifiedError.status;
    errorSources = simplifiedError.errorSources as Array<TErrorSources>;
    message = simplifiedError.message;
  } else if (err instanceof AppError) {
    status = err.status;
    message = err.message;
  } else if (err instanceof Error) {
    status = 500;
    message = err.message;
  }

  res.status(status).json({
    success: false,
    message,
    errorSources,
    err:
      config.node_env === 'development'
        ? (() => {
            const { stack, ...rest } = err;
            return rest;
          })()
        : null,
    stack: config.node_env === 'development' ? err.stack?.split('\n') : null,
  });
};
