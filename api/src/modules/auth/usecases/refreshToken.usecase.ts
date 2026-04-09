import { IAuthRepository } from '@modules/auth/interfaces/IAuthRepository';
import { RefreshTokenInputDTO, TokenResponseDTO } from '@modules/auth/dtos/auth.dto';

export class RefreshTokenUsecase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(data: RefreshTokenInputDTO): Promise<TokenResponseDTO> {
    // TODO: Refresh token logic (validate RT, issue new AT/RT)
    return { accessToken: 'new-access-token', refreshToken: 'new-refresh-token' };
  }
}
