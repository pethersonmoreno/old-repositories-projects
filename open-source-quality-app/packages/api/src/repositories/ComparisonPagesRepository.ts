import { ComparisonPage } from '../entities/ComparisonPage';

export interface ComparisonPagesRepository {
  create(comparisonPage: ComparisonPage): Promise<void>;

  search(projectIds: string[], exact: boolean): Promise<ComparisonPage[]>;
  findBySlug(slug: string): Promise<ComparisonPage | null>;
}
