import { Router } from 'express';
import { ControllerFactoryDefault } from './factories/implementations/ControllerFactoryDefault';
import { ExternalFactoryDefault } from './factories/implementations/ExternalFactoryDefault';
import { InMemoryRepositoryFactory } from './factories/implementations/InMemoryRepositoryFactory';
import { UsecaseFactoryDefault } from './factories/implementations/UsecaseFactoryDefault';

const router = Router();

const repositoryFactory = new InMemoryRepositoryFactory();
const externalFactory = new ExternalFactoryDefault();
const usecaseFactory = new UsecaseFactoryDefault(repositoryFactory, externalFactory);
const controllerFactory = new ControllerFactoryDefault(usecaseFactory);

const searchProjectsController = controllerFactory.createSearchProjectsController();
const getProjectController = controllerFactory.createGetProjectController();

const searchComparisonPagesController = controllerFactory.createSearchComparisonPagesController();
const createComparisonPageController = controllerFactory.createCreateComparisonPageController();
const getComparisonPageController = controllerFactory.createGetComparisonPageController();

router.get('/project/search', searchProjectsController.handle);
router.get('/project/:projectId', getProjectController.handle);

router.get('/comparisonPage', searchComparisonPagesController.handle);
router.post('/comparisonPage', createComparisonPageController.handle);
router.get('/comparisonPa/:slug', getComparisonPageController.handle);

export { router };
