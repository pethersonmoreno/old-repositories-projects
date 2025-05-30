import { ComparisonPage } from '../../entities/ComparisonPage';
import { Project } from '../../entities/Project';
import { ComparisonPagesRepository } from '../../repositories/ComparisonPagesRepository';
import { ProjectsRepository } from '../../repositories/ProjectsRepository';
import { ComparisonPageDTO } from './ComparisonPageDTO';

export class GetComparisonPageUsecase {
  constructor(
    private comparisonPagesRepository: ComparisonPagesRepository,
    private projectsRepository: ProjectsRepository,
  ) {}

  async execute(slug: string): Promise<ComparisonPageDTO | null> {
    const comparisonPage = await this.comparisonPagesRepository.findBySlug(slug);
    if (!comparisonPage) {
      return null;
    }
    const projects = await this.getProjectsFromComparisonPage(comparisonPage);
    return {
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
    };
  }

  private async getProjectsFromComparisonPage(comparisonPageFound: ComparisonPage): Promise<Project[]> {
    const allUniqueProjectIds = [...new Set(comparisonPageFound.projectIds)];
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
