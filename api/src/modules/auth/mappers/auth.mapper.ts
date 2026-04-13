import { UserModel } from '@modules/auth/models/user.model';
import { LoginOutputDTO, TokenResponseDTO } from '@modules/auth/dtos/auth.dto';

export class AuthMapper {
  static toAuthResponse(user: UserModel, accessToken: string, refreshToken: string): LoginOutputDTO {
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

  static toTokenResponse(accessToken: string, role: string): TokenResponseDTO {
    return {
      accessToken,
      role
    };
  }
}
