import { Request, Response, NextFunction } from 'express';
import { CustomError } from '@shared/utils/CustomError';
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants';
import { MESSAGES } from '@shared/constants/messages.constants';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // TODO: JWT verification logic
  // const token = req.headers.authorization?.split(' ')[1];
  // if (!token) throw new CustomError(MESSAGES.AUTH.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
  
  // Placeholder user injection
  req.user = { id: 'uuid-123', role: 'candidate' };
  next();
};
