import { ProjectsRepository } from '../../repositories/ProjectsRepository';
import { SimplifiedProject } from '../../entities/SimplifiedProject';
import { Project } from '../../entities/Project';
import { RegisterProjectUsecase } from '../project/RegisterProjectUsecase';
import { ComparisonPagesRepository } from '../../repositories/ComparisonPagesRepository';
import { OpenSourceProjectsAPI } from '../../external/OpenSourceProjectsAPI';

export class CreateComparisonPageUsecase {
  constructor(
    private projectsRepository: ProjectsRepository,
    private openSourceProjectsAPI: OpenSourceProjectsAPI,
    private registerProjectUsecase: RegisterProjectUsecase,
    private comparisonPagesRepository: ComparisonPagesRepository,
  ) {}

  async execute(projectIds: string[]) {
    const comparisonPagesWithSameProjects = await this.comparisonPagesRepository.search(projectIds, true);
    if (comparisonPagesWithSameProjects.length > 0) {
      throw new Error('Comparison Page already exists');
    }
    const projectsFromRepository = await this.getCurrentProjects(projectIds);
    const projectsCreated = await this.registerNewProjects(projectsFromRepository);
    const projects = projectsFromRepository.map((item) => {
      if (item.project) {
        return item.project;
      }
      return projectsCreated.find((project) => project.id === item.fullName) as Project;
    });
    const slug = await this.generateSlugToComparisonProjects(projects);
    await this.comparisonPagesRepository.create({
      slug,
      qtdUserVisits: 0,
      projectIds: projects.map((project) => project.id),
    });
  }

  private async getCurrentProjects(projectFullNames: string[]) {
    return Promise.all(
      projectFullNames.map(async (fullName) => ({
        fullName,
        project: await this.projectsRepository.findById(fullName),
      })),
    );
  }

  private async registerNewProjects(
    projectsFromRepository: { fullName: string; project: Project | null }[],
  ): Promise<Project[]> {
    const projectsToCreate = await Promise.all(
      projectsFromRepository
        .filter((item) => item.project === null)
        .map(async ({ fullName }) => ({
          fullName,
          simplifiedProject: await this.openSourceProjectsAPI.findSimplifiedByFullname(fullName),
        })),
    );
    const projectsToCreateFound = projectsToCreate
      .filter((item) => item.simplifiedProject !== null)
      .map((item) => ({ id: item.fullName, simplifiedProject: item.simplifiedProject as SimplifiedProject }));
    if (projectsToCreateFound.length < projectsToCreate.length) {
      throw new Error('Project not found');
    }
    const projectsCreated = await Promise.all(
      projectsToCreateFound.map(({ simplifiedProject }) => this.registerProjectUsecase.execute(simplifiedProject)),
    );
    return projectsCreated;
  }

  private async generateSlugToComparisonProjects(projects: Project[], fullNameIndex = -1): Promise<string> {
    const slug = this.generateSlug(projects, fullNameIndex);
    const foundSlug = !!(await this.comparisonPagesRepository.findBySlug(slug));
    if (!foundSlug) {
      return slug;
    }
    if (fullNameIndex < projects.length) {
      return this.generateSlugToComparisonProjects(projects, fullNameIndex + 1);
    }
    throw new Error('Fail on generate slug to comparison project');
  }

  private generateSlug = (projects: Project[], fullNameIndex: number) =>
    projects.reduce(
      (acc, project, index) =>
        `${acc}${acc ? '-' : ''}${index <= fullNameIndex ? `${project.owner}-` : ''}${project.name}`,
      '',
    );
}
