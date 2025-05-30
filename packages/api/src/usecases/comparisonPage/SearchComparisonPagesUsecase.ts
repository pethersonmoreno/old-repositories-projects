import { Project } from '../../entities/Project';
import { ProjectsRepository } from '../../repositories/ProjectsRepository';
import { ComparisonPagesRepository } from '../../repositories/ComparisonPagesRepository';
import { ComparisonPage } from '../../entities/ComparisonPage';
import { ComparisonPageDTO } from './ComparisonPageDTO';

export class SearchComparisonPagesUsecase {
  constructor(
    private projectsRepository: ProjectsRepository,
    private comparisonPagesRepository: ComparisonPagesRepository,
  ) {}

  async execute(projectIds: string[], exact: boolean): Promise<ComparisonPageDTO[]> {
    const comparisonPagesFound = await this.comparisonPagesRepository.search(projectIds, exact);
    const projects = await this.getProjectsFromComparisonPages(comparisonPagesFound);
    return comparisonPagesFound.map((comparisonPage) => ({
      slug: comparisonPage.slug,
      qtdUserVisits: comparisonPage.qtdUserVisits,
      projects: comparisonPage.projectIds.map((id) => {
        const project = projects.find((proj) => proj.id === id) as Project;
        return {
          fullName: project.id,
          owner: project.owner,
          name: project.name,
          description: project.description,
        };
      }),
    }));
  }

  private async getProjectsFromComparisonPages(comparisonPagesFound: ComparisonPage[]): Promise<Project[]> {
    const allUniqueProjectIds = [
      ...new Set(comparisonPagesFound.reduce((acc, item) => [...acc, ...item.projectIds], [] as string[])),
    ];
    const projects = await Promise.all(
      allUniqueProjectIds.map(async (id) => ({
        id,
        simplifiedProject: await this.projectsRepository.findById(id),
      })),
    );
    if (projects.find((proj) => proj.simplifiedProject === null)) {
      throw new Error('Error on get projects');
    }
    return projects.map((item) => item.simplifiedProject) as Project[];
  }
}
