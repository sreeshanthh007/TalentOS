import { UseCaseRegistry } from './usecase.registry';
import { AuthController } from '@modules/auth/controllers/auth.controller';
import { JwtService } from '@shared/services/jwt.service';
import { BcryptService } from '@shared/services/bcrypt.service';

export class Resolver {
  public static authController: AuthController;
  public static tokenService: JwtService;
  public static bcryptService: BcryptService;

  public static registerServices(): void {
    this.tokenService = new JwtService();
    this.bcryptService = new BcryptService();
  }

  public static registerControllers(): void {
    this.authController = new AuthController(
      UseCaseRegistry.registerCandidateUsecase,
      UseCaseRegistry.registerEmployerUsecase,
      UseCaseRegistry.loginUsecase,
      UseCaseRegistry.refreshTokenUsecase,
      UseCaseRegistry.blacklistTokenUsecase,
      UseCaseRegistry.revokeRefreshTokenUsecase
    );
  }
}
