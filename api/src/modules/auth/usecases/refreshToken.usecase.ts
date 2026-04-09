import { RefreshTokenInputDTO, TokenResponseDTO } from '@modules/auth/dtos/auth.dto';
import { ITokenService, JwtPayload } from '../interfaces/ITokenService';
import { CustomError } from '@shared/utils/CustomError';
import { ERROR_MESSAGES } from '@shared/constants/messages.constants';
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants';
import { RedisClient } from "@shared/config/redis.config";

export class RefreshTokenUsecase {
  constructor(private readonly tokenService: ITokenService) {}

  async execute(inputData: RefreshTokenInputDTO): Promise<TokenResponseDTO> {
    
    const payload = this.tokenService.verifyRefreshToken(inputData.refreshToken);

    if (!payload) {
      throw new CustomError(ERROR_MESSAGES.REFRESH_TOKEN_ERROR, HTTP_STATUS.UNAUTHORIZED);
    }

    
    const session = await RedisClient.hGetAll(`refresh:${inputData.refreshToken}`);
    if (!session || Object.keys(session).length === 0) {
      throw new CustomError(ERROR_MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
    }

    // 3. Generate new Access Token
    const accessToken = this.tokenService.generateAccessToken({
      id: payload.id,
      email: payload.email,
      role: payload.role,
    });

    return {
      role: payload.role,
      accessToken
    };
  }
}
