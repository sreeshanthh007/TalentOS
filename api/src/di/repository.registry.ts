import { AuthRepository } from '@modules/auth/repositories/auth.repository';

export class RepositoryRegistry {
  public static authRepository: AuthRepository;

  public static registerRepositories(): void {
    this.authRepository = new AuthRepository();
  }
}
