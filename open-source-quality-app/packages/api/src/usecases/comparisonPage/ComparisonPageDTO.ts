import { SimplifiedProject } from '../../entities/SimplifiedProject';

export type ComparisonPageDTO = {
  slug: string;
  qtdUserVisits: number;
  projects: SimplifiedProject[];
};
