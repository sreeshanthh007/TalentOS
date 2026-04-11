import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { RedisClient } from '@shared/config/redis.config';
import { Resolver } from '@di/index';
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants';
import { ERROR_MESSAGES } from '@shared/constants/messages.constants';
import { ROLE_MAP } from '@shared/constants/roles.constants';
import { logger } from '@shared/utils/logger';

export interface CustomJWTPayload extends JwtPayload {
  id: string;
  email: string;
  role: 'candidate' | 'employer' | 'admin';
  access_token: string;
  refresh_token: string;
}

export interface CustomRequest extends Request {
  user: CustomJWTPayload;
}

const extractToken = (req: Request): { access_token: string; refresh_token: string } | null => {
  const basePath = req.baseUrl.split("/");

  const userType = ROLE_MAP[basePath[3]];

  if (["admin", "employer", "candidate"].includes(userType)) {
    return {
      access_token: req.cookies[`${userType}_access_token`] || null,
      refresh_token: req.cookies[`${userType}_refresh_token`] || null,
    };
  }

  return null;
};

const isBlacklisted = async (token: string): Promise<boolean> => {
  const result = await RedisClient.get(token);
  return result !== null;
};

export const verifyAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = extractToken(req);
    logger.info("token is",token)
    if (!token || !token.access_token) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ 
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS
      });
      return;
    }

    if (await isBlacklisted(token.access_token)) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ 
        success: false,
        message: ERROR_MESSAGES.TOKEN_BLACKLISTED 
      });
      return;
    }

    const tokenService = Resolver.tokenService;
    const user = tokenService.verifyAccessToken(token.access_token) as CustomJWTPayload;

    if (!user || !user.id) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ 
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS 
      });
      return;
    }

    (req as CustomRequest).user = {
      ...user,
      access_token: token.access_token,
      refresh_token: token.refresh_token
    };

    next();
  } catch (error: any) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: ERROR_MESSAGES.INVALID_TOKEN,
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      error: error.message
    });
  }
};

export const decodeToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = extractToken(req);

    if (!token?.refresh_token) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ 
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS 
      });
      return;
    }

    const tokenService = Resolver.tokenService;
    const user = tokenService.verifyRefreshToken(token.refresh_token) as CustomJWTPayload;

    if (!user || !user.id) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ 
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS 
      });
      return;
    }

    const newAccessToken = tokenService.generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    (req as CustomRequest).user = {
      id: user.id,
      email: user.email,
      role: user.role,
      access_token: newAccessToken,
      refresh_token: token.refresh_token
    } as CustomJWTPayload;

    next();
  } catch (error: any) {
    console.log("failed to decode", error);
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ 
      success: false,
      message: ERROR_MESSAGES.INVALID_TOKEN 
    });
  }
};
