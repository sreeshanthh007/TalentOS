import { RepositoryRegistry } from './repository.registry';
import { RegisterUsecase } from '@modules/auth/usecases/register.usecase';
import { LoginUsecase } from '@modules/auth/usecases/login.usecase';
import { RefreshTokenUsecase } from '@modules/auth/usecases/refreshToken.usecase';

export class UseCaseRegistry {
  public static registerUsecase: RegisterUsecase;
  public static loginUsecase: LoginUsecase;
  public static refreshTokenUsecase: RefreshTokenUsecase;

  public static registerUseCases(): void {
    const authRepo = RepositoryRegistry.authRepository;
    
    this.registerUsecase = new RegisterUsecase(authRepo);
    this.loginUsecase = new LoginUsecase(authRepo);
    this.refreshTokenUsecase = new RefreshTokenUsecase(authRepo);
  }
}
