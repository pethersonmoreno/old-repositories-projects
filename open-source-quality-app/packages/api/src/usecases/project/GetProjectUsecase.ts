import { ProjectsRepository } from '../../repositories/ProjectsRepository';
import { Project } from '../../entities/Project';

export class GetProjectUsecase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute(projectId: string): Promise<Project | null> {
    return this.projectsRepository.findById(projectId);
  }
}
