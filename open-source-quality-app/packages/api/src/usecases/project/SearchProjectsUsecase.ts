import { SimplifiedProject } from '../../entities/SimplifiedProject';
import { OpenSourceProjectsAPI } from '../../external/OpenSourceProjectsAPI';

export class SearchProjectsUsecase {
  constructor(private readonly openSourceProjectsAPI: OpenSourceProjectsAPI) {}

  async execute(search: string): Promise<SimplifiedProject[]> {
    return this.openSourceProjectsAPI.search(search);
  }
}
