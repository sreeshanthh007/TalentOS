import { IAuthRepository } from '../interfaces/IAuthRepository';
import { IBcryptService } from '../interfaces/IBcryptService';
import { generateAccessTokenUsecase } from './generateToken.usecase';
import { RegisterCandidateDTO } from '../dtos/auth.dto';
import { CustomError } from '@shared/utils/CustomError';
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants';
import { ERROR_MESSAGES } from '@shared/constants/messages.constants';

export class RegisterCandidateUsecase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly bcryptService: IBcryptService,
    private readonly generateTokenUsecase: generateAccessTokenUsecase
  ) {}

  async execute(data: RegisterCandidateDTO): Promise<void> {
    const existingUser = await this.authRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new CustomError(ERROR_MESSAGES.EMAIL_EXISTS, HTTP_STATUS.CONFLICT);
    }

    const passwordHash = await this.bcryptService.hash(data.password);
    
    const user = await this.authRepository.createUser({
      email: data.email,
      password_hash: passwordHash,
      role: 'candidate'
    });

    await this.authRepository.createCandidateProfile(user.id, {
      full_name: data.full_name,
      phone: data.phone,
      location: data.location,
      skills: data.skills
    });
  }
}
