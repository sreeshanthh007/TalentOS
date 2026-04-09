import { CustomError } from "@shared/utils/CustomError";
import { ITokenService, JwtPayload } from "../interfaces/ITokenService";
import { ERROR_MESSAGES } from "@shared/constants/messages.constants";
import { HTTP_STATUS } from "@shared/constants/statusCodes.constants";
import { RedisClient } from "@shared/config/redis.config";

export class BlacklistTokenUseCase {
  constructor(private readonly tokenService: ITokenService) {}

  async execute(token: string): Promise<void> {
    const decoded = this.tokenService.decodeAccessToken(token);

    if (!decoded || !decoded.exp) {
      throw new CustomError(ERROR_MESSAGES.INVALID_TOKEN, HTTP_STATUS.BAD_REQUEST);
    }

    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

    if (expiresIn > 0) {
      // Use "EX" for expiration in seconds (standard redis command arg)
      await RedisClient.set(token, "blacklisted", { EX: expiresIn });
    }
  }
}