import { IAuthRepository } from '@modules/auth/interfaces/IAuthRepository';
import { LoginInputDTO, AuthResponseDTO } from '@modules/auth/dtos/auth.dto';
import { AuthMapper } from '@modules/auth/mappers/auth.mapper';
import { CustomError } from '@shared/utils/CustomError';
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants';
import { MESSAGES } from '@shared/constants/messages.constants';

export class LoginUsecase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(data: LoginInputDTO): Promise<AuthResponseDTO> {
    const user = await this.authRepository.findByEmail(data.email);
    
    if (!user) {
      throw new CustomError(MESSAGES.AUTH.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
    }

    // TODO: Verify password and sign JWT tokens
    
    return {
      user: AuthMapper.toResponseDTO(user),
      accessToken: 'dummy-access-token',
      refreshToken: 'dummy-refresh-token'
    };
  }
}
