import Jwt, { Secret, JwtPayload as libJwtPayload } from "jsonwebtoken";
import { ITokenService, JwtPayload } from "@modules/auth/interfaces/ITokenService";
import { config } from "@shared/config/env.config";
import ms from "ms";
import { logger } from "@shared/utils/logger";

export class JwtService implements ITokenService {
  private accessSecret: Secret;
  private refreshSecret: Secret;
  private accessExpiresIn: string;
  private refreshExpiresIn: string;

  constructor() {
    this.accessSecret = config.JWT_ACCESS_SECRET;
    this.refreshSecret = config.JWT_REFRESH_SECRET;
    this.accessExpiresIn = config.JWT_ACCESS_EXPIRES_IN;
    this.refreshExpiresIn = config.JWT_REFRESH_EXPIRES_IN;
  }

  generateAccessToken(payload: JwtPayload): string {
    return Jwt.sign(payload, this.accessSecret, {
      expiresIn: this.accessExpiresIn as ms.StringValue
    });
  }

  generateRefreshToken(payload: JwtPayload): string {
    return Jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExpiresIn as ms.StringValue
    });
  }

  verifyAccessToken(token: string): JwtPayload | null {
    try {
      const decoded = Jwt.verify(token, this.accessSecret) as libJwtPayload;
      return decoded as unknown as JwtPayload;
    } catch (error) {
      logger.error("Error in verifying access token", error);
      return null;
    }
  }

  verifyRefreshToken(token: string): JwtPayload | null {
    try {
      const decoded = Jwt.verify(token, this.refreshSecret) as libJwtPayload;
      return decoded as unknown as JwtPayload;
    } catch (error) {
      logger.error("Error in verifying refresh token", error);
      return null;
    }
  }

  decodeAccessToken(token: string): JwtPayload | null {
    try {
      const decoded = Jwt.decode(token) as libJwtPayload;
      return decoded as unknown as JwtPayload;
    } catch (error) {
      logger.error("Access token decode failed", error);
      return null;
    }
  }
}
