import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '@shared/utils/logger';
import { CustomError, ValidationError, TValidationIssue } from '@shared/utils/CustomError';
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants';
import { ERROR_MESSAGES } from '@shared/constants/messages.constants';

export type TError = Error & {
  statusCode?: number;
  errors?: any[];
};

export class ErrorMiddleware {
  public static handleError(
    err: TError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    let statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let message: string = ERROR_MESSAGES.SERVER_ERROR;
    let errors: TValidationIssue[] | undefined;

    logger.error("An Error Occurred", {
      message: err.message,
      stack: err.stack,
      method: req.method,
      url: req.url,
      timestamp: new Date().toISOString(),
    });

    if (err instanceof ZodError) {
      statusCode = HTTP_STATUS.BAD_REQUEST;
      message = ERROR_MESSAGES.VALIDATION_ERROR;
      errors = err.issues.map((issue) => ({ message: issue.message, path: issue.path }));
    } else if (err instanceof CustomError) {
      statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      message = err.message;

      if (err instanceof ValidationError) {
        errors = err.errors;
      }
    } else {
      statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      message = err.message || ERROR_MESSAGES.SERVER_ERROR;
    }

    if (res.headersSent) {
      return next(err);
    }

    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      ...(errors && { errors }),
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }
}
