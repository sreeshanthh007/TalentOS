import { IAuthRepository } from '../interfaces/IAuthRepository';
import { IBcryptService } from '../interfaces/IBcryptService';
import { generateAccessTokenUsecase } from './generateToken.usecase';
import { RegisterEmployerDTO } from '../dtos/auth.dto';
import { CustomError } from '@shared/utils/CustomError';
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants';
import { ERROR_MESSAGES } from '@shared/constants/messages.constants';
import { validateCompanyDomain } from '../validators/auth.validator';

export class RegisterEmployerUsecase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly bcryptService: IBcryptService,
    private readonly generateTokenUsecase: generateAccessTokenUsecase
  ) {}

  async execute(data: RegisterEmployerDTO): Promise<void> {
    if (!validateCompanyDomain(data.email)) {
      throw new CustomError(ERROR_MESSAGES.COMPANY_EMAIL, HTTP_STATUS.BAD_REQUEST);
    }

    const existingUser = await this.authRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new CustomError(ERROR_MESSAGES.EMAIL_EXISTS, HTTP_STATUS.CONFLICT);
    }

    const passwordHash = await this.bcryptService.hash(data.password);

    const user = await this.authRepository.createUser({
      email: data.email,
      password_hash: passwordHash,
      role: 'employer'
    });

    await this.authRepository.createEmployerProfile(user.id, {
      company_name: data.company_name,
      company_domain: data.company_domain,
      industry: data.industry,
      website: data.website,
      phone: data.phone
    });
  }
}
