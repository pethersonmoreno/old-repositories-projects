import { ProjectsRepository } from '../../repositories/ProjectsRepository';
import { SimplifiedProject } from '../../entities/SimplifiedProject';
import { Project } from '../../entities/Project';
import { OpenSourceProjectsAPI } from '../../external/OpenSourceProjectsAPI';

export class RegisterProjectUsecase {
  constructor(private projectsRepository: ProjectsRepository, private openSourceProjectsAPI: OpenSourceProjectsAPI) {}

  async execute(simplifiedProject: SimplifiedProject): Promise<Project> {
    const repoProject = await this.openSourceProjectsAPI.findByFullname(simplifiedProject.fullName);
    if (repoProject === null) {
      throw new Error('Projct repository not found');
    }
    const newProject = new Project({
      id: simplifiedProject.fullName,
      owner: simplifiedProject.owner,
      name: simplifiedProject.name,
      description: simplifiedProject.description,
      qtdOpenIssues: repoProject?.open_issues_count,
    });
    await this.projectsRepository.create(newProject);
    return newProject;
  }
}
