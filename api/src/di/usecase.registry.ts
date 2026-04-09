import { RepositoryRegistry } from './repository.registry';
import { Resolver } from './resolver';
import { RegisterCandidateUsecase } from '@modules/auth/usecases/registerCandidate.usecase';
import { RegisterEmployerUsecase } from '@modules/auth/usecases/registerEmployer.usecase';
import { LoginUsecase } from '@modules/auth/usecases/login.usecase';
import { RefreshTokenUsecase } from '@modules/auth/usecases/refreshToken.usecase';
import { generateAccessTokenUsecase } from '@modules/auth/usecases/generateToken.usecase';
import { RevokeRefreshTokenUseCase } from '@modules/auth/usecases/revokeRefreshToken.usecase';
import { BlacklistTokenUseCase } from '@modules/auth/usecases/blacklistToken.usecase';

export class UseCaseRegistry {
  public static registerCandidateUsecase: RegisterCandidateUsecase;
  public static registerEmployerUsecase: RegisterEmployerUsecase;
  public static loginUsecase: LoginUsecase;
  public static refreshTokenUsecase: RefreshTokenUsecase;
  public static generateAccessTokenUsecase: generateAccessTokenUsecase;
  public static revokeRefreshTokenUsecase: RevokeRefreshTokenUseCase;
  public static blacklistTokenUsecase: BlacklistTokenUseCase;

  public static registerUseCases(): void {
    const authRepo = RepositoryRegistry.authRepository;
    const bcryptService = Resolver.bcryptService;
    const tokenService = Resolver.tokenService;
    
    this.generateAccessTokenUsecase = new generateAccessTokenUsecase(tokenService);
    
    this.registerCandidateUsecase = new RegisterCandidateUsecase(
      authRepo, 
      bcryptService, 
      this.generateAccessTokenUsecase
    );
    
    this.registerEmployerUsecase = new RegisterEmployerUsecase(
      authRepo, 
      bcryptService, 
      this.generateAccessTokenUsecase
    );
    
    this.loginUsecase = new LoginUsecase(
      authRepo, 
      bcryptService, 
      this.generateAccessTokenUsecase
    );
    
    this.refreshTokenUsecase = new RefreshTokenUsecase(tokenService);
    this.revokeRefreshTokenUsecase = new RevokeRefreshTokenUseCase();
    this.blacklistTokenUsecase = new BlacklistTokenUseCase(tokenService);
  }
}
