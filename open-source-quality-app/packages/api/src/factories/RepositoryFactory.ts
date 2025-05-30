import { ProjectsRepository } from '../repositories/ProjectsRepository';
import { ComparisonPagesRepository } from '../repositories/ComparisonPagesRepository';

export interface RepositoryFactory {
  createProjectsRepository(): ProjectsRepository;
  createComparisonPagesRepository(): ComparisonPagesRepository;
}
