import { CreateComparisonPageUsecase } from '../../usecases/comparisonPage/CreateComparisonPageUsecase';
import { GetComparisonPageUsecase } from '../../usecases/comparisonPage/GetComparisonPageUsecase';
import { SearchComparisonPagesUsecase } from '../../usecases/comparisonPage/SearchComparisonPagesUsecase';
import { GetProjectUsecase } from '../../usecases/project/GetProjectUsecase';
import { RegisterProjectUsecase } from '../../usecases/project/RegisterProjectUsecase';
import { SearchProjectsUsecase } from '../../usecases/project/SearchProjectsUsecase';
import { ExternalFactory } from '../ExternalFactory';
import { RepositoryFactory } from '../RepositoryFactory';
import { UsecaseFactory } from '../UsecaseFactory';

export class UsecaseFactoryDefault implements UsecaseFactory {
  constructor(private repositoryFactory: RepositoryFactory, private externalFactory: ExternalFactory) {}

  createCreateComparisonPageUsecase(): CreateComparisonPageUsecase {
    return new CreateComparisonPageUsecase(
      this.repositoryFactory.createProjectsRepository(),
      this.externalFactory.createOpenSourceProjectsAPI(),
      this.createRegisterProjectUsecase(),
      this.repositoryFactory.createComparisonPagesRepository(),
    );
  }

  createGetComparisonPageUsecase(): GetComparisonPageUsecase {
    return new GetComparisonPageUsecase(
      this.repositoryFactory.createComparisonPagesRepository(),
      this.repositoryFactory.createProjectsRepository(),
    );
  }

  createSearchComparisonPagesUsecase(): SearchComparisonPagesUsecase {
    return new SearchComparisonPagesUsecase(
      this.repositoryFactory.createProjectsRepository(),
      this.repositoryFactory.createComparisonPagesRepository(),
    );
  }

  createGetProjectUsecase(): GetProjectUsecase {
    return new GetProjectUsecase(this.repositoryFactory.createProjectsRepository());
  }

  createRegisterProjectUsecase(): RegisterProjectUsecase {
    return new RegisterProjectUsecase(
      this.repositoryFactory.createProjectsRepository(),
      this.externalFactory.createOpenSourceProjectsAPI(),
    );
  }

  createSearchProjectsUsecase(): SearchProjectsUsecase {
    return new SearchProjectsUsecase(this.externalFactory.createOpenSourceProjectsAPI());
  }
}
