import { ComparisonPage } from '../../../entities/ComparisonPage';
import { ComparisonPagesRepository } from '../../../repositories/ComparisonPagesRepository';

let comparisonPagesList: ComparisonPage[] = [];

export class InMemoryComparisonPagesRepository implements ComparisonPagesRepository {
  async create(comparisonPage: ComparisonPage): Promise<void> {
    if (this.isThereRepeatedId(comparisonPage.projectIds)) {
      throw new Error("Can't create comparison page using repeated id");
    }
    const comparisonPageFound = await this.findBySlug(comparisonPage.slug);
    if (comparisonPageFound) {
      throw new Error('Comparison Page already exists');
    }
    comparisonPagesList = [...comparisonPagesList, comparisonPage];
  }

  async search(projectIds: string[], exact: boolean): Promise<ComparisonPage[]> {
    if (this.isThereRepeatedId(projectIds)) {
      throw new Error("Can't find comparison page using repeated id");
    }
    if (projectIds.length === 0) {
      return [];
    }
    const matchedComparisonPages = comparisonPagesList.filter((comparisonPage) =>
      projectIds.reduce((prev, projectId) => prev && comparisonPage.projectIds.includes(projectId), true as boolean),
    );
    if (!exact) {
      return matchedComparisonPages;
    }
    return matchedComparisonPages.filter((comparisonPage) => comparisonPage.projectIds.length === projectIds.length);
  }

  findBySlug = async (slug: string): Promise<ComparisonPage | null> =>
    comparisonPagesList.find((comparisonPage) => comparisonPage.slug === slug) || null;

  private isThereRepeatedId = (projectIds: string[]): boolean =>
    projectIds.filter((id) => projectIds.filter((projId) => projId === id).length > 1).length > 0;
}
