import { UseCaseRegistry } from './usecase.registry';
import { AuthController } from '@modules/auth/controllers/auth.controller';
import { PublicController } from '@modules/public/controllers/public.controller';
import { CandidatesController } from '@modules/candidates/controllers/candidates.controller';
import { JwtService } from '@shared/services/jwt.service';
import { BcryptService } from '@shared/services/bcrypt.service';
import { CloudinarySignatureService } from '@shared/services/cloud.service';

export class Resolver {
  public static authController: AuthController;
  public static publicController: PublicController;
  public static candidatesController: CandidatesController;
  public static tokenService: JwtService;
  public static bcryptService: BcryptService;
  public static cloudinarySignatureService: CloudinarySignatureService;

  public static registerServices(): void {
    this.tokenService = new JwtService();
    this.bcryptService = new BcryptService();
    this.cloudinarySignatureService = new CloudinarySignatureService();
  }

  public static registerControllers(): void {
    this.authController = new AuthController(
      UseCaseRegistry.registerCandidateUsecase,
      UseCaseRegistry.registerEmployerUsecase,
      UseCaseRegistry.loginUsecase,
      UseCaseRegistry.refreshTokenUsecase,
      UseCaseRegistry.blacklistTokenUsecase,
      UseCaseRegistry.revokeRefreshTokenUsecase,
      this.cloudinarySignatureService
    );
    this.publicController = new PublicController(UseCaseRegistry.publicUseCase);
    this.candidatesController = new CandidatesController(UseCaseRegistry.candidateUseCase);
  }
}
