import { Request, Response, NextFunction } from 'express';
import { CustomError } from '@shared/utils/CustomError';
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants';
import { MESSAGES } from '@shared/constants/messages.constants';

export const roleMiddleware = (...roles: Array<'candidate' | 'employer' | 'admin'>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new CustomError(MESSAGES.AUTH.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
    }
    next();
  };
};
