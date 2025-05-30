import { CreateComparisonPageController } from '../../controllers/comparisonPage/CreateComparisonPageController';
import { GetComparisonPageController } from '../../controllers/comparisonPage/GetComparisonPageController';
import { SearchComparisonPagesController } from '../../controllers/comparisonPage/SearchComparisonPagesController';
import { GetProjectController } from '../../controllers/project/GetProjectController';
import { SearchProjectsController } from '../../controllers/project/SearchProjectsController';
import { ControllerFactory } from '../ControllerFactory';
import { UsecaseFactory } from '../UsecaseFactory';

export class ControllerFactoryDefault implements ControllerFactory {
  constructor(private usecaseFactory: UsecaseFactory) {}

  createCreateComparisonPageController(): CreateComparisonPageController {
    return new CreateComparisonPageController(this.usecaseFactory.createCreateComparisonPageUsecase());
  }

  createGetComparisonPageController(): GetComparisonPageController {
    return new GetComparisonPageController(this.usecaseFactory.createGetComparisonPageUsecase());
  }

  createSearchComparisonPagesController(): SearchComparisonPagesController {
    return new SearchComparisonPagesController(this.usecaseFactory.createSearchComparisonPagesUsecase());
  }

  createGetProjectController(): GetProjectController {
    return new GetProjectController(this.usecaseFactory.createGetProjectUsecase());
  }

  createSearchProjectsController(): SearchProjectsController {
    return new SearchProjectsController(this.usecaseFactory.createSearchProjectsUsecase());
  }
}
