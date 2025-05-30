import { Request, Response } from 'express';
import { SearchComparisonPagesUsecase } from '../../usecases/comparisonPage/SearchComparisonPagesUsecase';

export class SearchComparisonPagesController {
  constructor(private readonly searchComparisonPagesUsecase: SearchComparisonPagesUsecase) {}

  handle = async (request: Request, response: Response): Promise<Response> => {
    const queryProject = request.query.project as string | string[] | undefined;
    if (queryProject === undefined) {
      return response.status(400).json({ message: 'Invalid project ids' }).send();
    }
    const projectsIds = typeof queryProject === 'string' ? [queryProject] : queryProject;
    const exact = (request.query.exact as 'true' | 'false' | undefined) === 'true';
    try {
      const searchResult = await this.searchComparisonPagesUsecase.execute(projectsIds, exact);
      return response.status(200).json(searchResult).send();
    } catch (err) {
      return response
        .status(400)
        .json({
          message: err.message || 'Unexpected error',
        })
        .send();
    }
  };
}
