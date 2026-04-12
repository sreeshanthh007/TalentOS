import { RepositoryRegistry } from './repository.registry';
import { Resolver } from './resolver';
import { AuthUsecase } from '@modules/auth/usecases/auth.usecase';
import { PublicUseCase } from '@modules/public/usecases/public.usecase';
import { CandidateUsecase } from '@modules/candidates/usecases/candidate.usecase';
import { EmployerUsecase } from '@modules/employer/usecases/employer.usecase';

export class UseCaseRegistry {
  public static authUsecase: AuthUsecase;
  public static publicUseCase: PublicUseCase;
  public static candidateUseCase: CandidateUsecase;
  public static employerUseCase: EmployerUsecase;

  public static registerUseCases(): void {
    const authRepo = RepositoryRegistry.authRepository;
    const bcryptService = Resolver.bcryptService;
    const tokenService = Resolver.tokenService;
    
    this.authUsecase = new AuthUsecase(
      authRepo, 
      bcryptService, 
      tokenService
    );
    
    this.publicUseCase = new PublicUseCase(RepositoryRegistry.publicRepository);
    this.candidateUseCase = new CandidateUsecase(RepositoryRegistry.candidatesRepository, Resolver.aiService);
    this.employerUseCase = new EmployerUsecase(RepositoryRegistry.employerRepository);
  }
}



