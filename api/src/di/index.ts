import { RepositoryRegistry } from './repository.registry';
import { UseCaseRegistry } from './usecase.registry';
import { Resolver } from './resolver';

export class DependencyInjection {
  public static registerAll(): void {
    Resolver.registerServices();
    RepositoryRegistry.registerRepositories();
    UseCaseRegistry.registerUseCases();
    Resolver.registerControllers();
  }
}

export * from './repository.registry';
export * from './usecase.registry';
export * from './resolver';
