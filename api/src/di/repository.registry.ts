import { AuthRepository } from '@modules/auth/repositories/auth.repository';
import { PublicRepository } from '@modules/public/repositories/public.repository';
import { CandidatesRepository } from '@modules/candidates/repositories/candidates.repository';
import { EmployerRepository } from '@modules/employers/repositories/employer.repository';
import { AdminRepository } from '@modules/admin/repositories/admin.repository';

export class RepositoryRegistry {
  public static authRepository: AuthRepository;
  public static publicRepository: PublicRepository;
  public static candidatesRepository: CandidatesRepository;
  public static employerRepository: EmployerRepository;
  public static adminRepository: AdminRepository;

  public static registerRepositories(): void {
    this.authRepository = new AuthRepository();
    this.publicRepository = new PublicRepository();
    this.candidatesRepository = new CandidatesRepository();
    this.employerRepository = new EmployerRepository();
    this.adminRepository = new AdminRepository();
  }
}


