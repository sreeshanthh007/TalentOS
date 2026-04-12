import { IAuthRepository } from '@modules/auth/interfaces/IAuthRepository';
import { IBcryptService } from '@modules/auth/interfaces/IBcryptService';
import { ITokenService, JwtPayload } from '@modules/auth/interfaces/ITokenService';
import { 
  LoginInputDTO, 
  LoginOutputDTO, 
  RegisterCandidateDTO, 
  RegisterEmployerDTO, 
  RefreshTokenInputDTO, 
  TokenResponseDTO 
} from '@modules/auth/dtos/auth.dto';
import { CustomError } from '@shared/utils/CustomError';
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants';
import { ERROR_MESSAGES } from '@shared/constants/messages.constants';
import { validateCompanyDomain } from '@modules/auth/validators/auth.validator';
import { RedisClient } from "@shared/config/redis.config";
import { UserRole } from "@shared/types/database.types";

export class AuthUsecase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly bcryptService: IBcryptService,
    private readonly tokenService: ITokenService
  ) {}

  private async generateTokens(id: string, email: string, role: string): Promise<{accessToken: string, refreshToken: string}> {
    const payload = { 
        id, 
        email, 
        role: role as UserRole 
    };

    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const ttl = Math.floor((expiresAt.getTime() - Date.now()) / 1000);

    await RedisClient.hSet(`refresh:${refreshToken}`, {
        userType: role,
        user: id.toString()
    });

    await RedisClient.expire(`refresh:${refreshToken}`, ttl);
     
    return { accessToken, refreshToken };
  }

  async registerCandidate(data: RegisterCandidateDTO): Promise<void> {
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
      skills: data.skills,
      resume_url: data.resume_url,
    });
  }

  async registerEmployer(data: RegisterEmployerDTO): Promise<void> {
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

    // Create employer profile and get back the profile id
    const employerProfile = await this.authRepository.createEmployerProfile(user.id, {
      company_name: data.company_name,
      company_domain: data.company_domain,
      industry: data.industry,
      website: data.website,
      phone: data.phone
    });

    let planId = data.plan_id;

    if (!planId || planId === 'undefined') {
      // Determine plan name — default to 'free' if not provided
      const planName = data.selected_plan ?? 'free';
      // Look up plan id from subscription_plans table
      const plan = await this.authRepository.findPlanByName(planName);
      if (!plan) {
        throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
      }
      planId = plan.id;
    }

    // Create subscription record
    await this.authRepository.createEmployerSubscription(employerProfile.id, planId);
  }

  async login(data: LoginInputDTO): Promise<LoginOutputDTO> {
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

    const { accessToken, refreshToken } = await this.generateTokens(
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

  async refreshToken(inputData: RefreshTokenInputDTO): Promise<TokenResponseDTO> {
    const payload = this.tokenService.verifyRefreshToken(inputData.refreshToken);

    if (!payload) {
      throw new CustomError(ERROR_MESSAGES.REFRESH_TOKEN_ERROR, HTTP_STATUS.UNAUTHORIZED);
    }

    const session = await RedisClient.hGetAll(`refresh:${inputData.refreshToken}`);
    if (!session || Object.keys(session).length === 0) {
      throw new CustomError(ERROR_MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
    }

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

  async blacklistToken(token: string): Promise<void> {
    const decoded = this.tokenService.decodeAccessToken(token);

    if (!decoded || !decoded.exp) {
      throw new CustomError(ERROR_MESSAGES.INVALID_TOKEN, HTTP_STATUS.BAD_REQUEST);
    }

    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

    if (expiresIn > 0) {
      await RedisClient.set(token, "blacklisted", { EX: expiresIn });
    }
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await RedisClient.del(`refresh:${token}`);
  }
}
