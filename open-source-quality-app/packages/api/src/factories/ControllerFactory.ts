import { GetComparisonPageController } from '../controllers/comparisonPage/GetComparisonPageController';
import { CreateComparisonPageController } from '../controllers/comparisonPage/CreateComparisonPageController';
import { SearchComparisonPagesController } from '../controllers/comparisonPage/SearchComparisonPagesController';
import { GetProjectController } from '../controllers/project/GetProjectController';
import { SearchProjectsController } from '../controllers/project/SearchProjectsController';

export interface ControllerFactory {
  createCreateComparisonPageController(): CreateComparisonPageController;
  createGetComparisonPageController(): GetComparisonPageController;
  createSearchComparisonPagesController(): SearchComparisonPagesController;
  createGetProjectController(): GetProjectController;
  createSearchProjectsController(): SearchProjectsController;
}
