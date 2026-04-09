import { IAuthRepository } from '@modules/auth/interfaces/IAuthRepository';
import { RegisterInputDTO, AuthUserDTO } from '@modules/auth/dtos/auth.dto';
import { AuthMapper } from '@modules/auth/mappers/auth.mapper';

export class RegisterUsecase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(data: RegisterInputDTO): Promise<AuthUserDTO> {
    // TODO: Hash password before saving
    const user = await this.authRepository.create(data);
    return AuthMapper.toResponseDTO(user);
  }
}
