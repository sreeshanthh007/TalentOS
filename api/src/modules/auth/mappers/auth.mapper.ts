import { User } from '@modules/auth/models/user.model';
import { AuthUserDTO } from '@modules/auth/dtos/auth.dto';

export class AuthMapper {
  public static toResponseDTO(user: User): AuthUserDTO {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    };
  }
}
