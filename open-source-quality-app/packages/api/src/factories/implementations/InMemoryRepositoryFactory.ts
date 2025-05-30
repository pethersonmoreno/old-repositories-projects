import { InMemoryComparisonPagesRepository } from '../../infraestructure/repositories/inMemory/InMemoryComparisonPagesRepository';
import { InMemoryProjectsRepository } from '../../infraestructure/repositories/inMemory/InMemoryProjectsRepository';
import { ComparisonPagesRepository } from '../../repositories/ComparisonPagesRepository';
import { ProjectsRepository } from '../../repositories/ProjectsRepository';
import { RepositoryFactory } from '../RepositoryFactory';

export class InMemoryRepositoryFactory implements RepositoryFactory {
  createProjectsRepository = (): ProjectsRepository => new InMemoryProjectsRepository();

  createComparisonPagesRepository = (): ComparisonPagesRepository => new InMemoryComparisonPagesRepository();
}
