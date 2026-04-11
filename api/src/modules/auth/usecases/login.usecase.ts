import { IAuthRepository } from '../interfaces/IAuthRepository';
import { IBcryptService } from '../interfaces/IBcryptService';
import { generateAccessTokenUsecase } from './generateToken.usecase';
import { LoginInputDTO, LoginOutputDTO } from '../dtos/auth.dto';
import { CustomError } from '@shared/utils/CustomError';
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants';
import { ERROR_MESSAGES } from '@shared/constants/messages.constants';

export class LoginUsecase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly bcryptService: IBcryptService,
    private readonly generateTokenUsecase: generateAccessTokenUsecase
  ) {}

  async execute(data: LoginInputDTO): Promise<LoginOutputDTO> {
    const user = await this.authRepository.findUserByEmail(data.email);
    if (!user) {
      throw new CustomError(ERROR_MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    if (user.role !== data.role) {
      throw new CustomError(ERROR_MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
    }

    if (user.is_blocked) {
      throw new CustomError(ERROR_MESSAGES.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
    }

    const isPasswordMatch = await this.bcryptService.compare(data.password, user.password_hash);
    if (!isPasswordMatch) {
      throw new CustomError(ERROR_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
    }

    const { accessToken, refreshToken } = await this.generateTokenUsecase.execute(
      user.id,
      user.email,
      user.role
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    };
  }
}
