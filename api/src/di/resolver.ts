import { UseCaseRegistry } from './usecase.registry';
import { AuthController } from '@modules/auth/controllers/auth.controller';

export class Resolver {
  public static authController: AuthController;

  public static registerControllers(): void {
    this.authController = new AuthController(
      UseCaseRegistry.registerUsecase,
      UseCaseRegistry.loginUsecase,
      UseCaseRegistry.refreshTokenUsecase
    );
  }
}
