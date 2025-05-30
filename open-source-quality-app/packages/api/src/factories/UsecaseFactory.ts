import { GetComparisonPageUsecase } from '../usecases/comparisonPage/GetComparisonPageUsecase';
import { CreateComparisonPageUsecase } from '../usecases/comparisonPage/CreateComparisonPageUsecase';
import { SearchComparisonPagesUsecase } from '../usecases/comparisonPage/SearchComparisonPagesUsecase';
import { GetProjectUsecase } from '../usecases/project/GetProjectUsecase';
import { RegisterProjectUsecase } from '../usecases/project/RegisterProjectUsecase';
import { SearchProjectsUsecase } from '../usecases/project/SearchProjectsUsecase';

export interface UsecaseFactory {
  createCreateComparisonPageUsecase(): CreateComparisonPageUsecase;
  createGetComparisonPageUsecase(): GetComparisonPageUsecase;
  createSearchComparisonPagesUsecase(): SearchComparisonPagesUsecase;
  createGetProjectUsecase(): GetProjectUsecase;
  createRegisterProjectUsecase(): RegisterProjectUsecase;
  createSearchProjectsUsecase(): SearchProjectsUsecase;
}
