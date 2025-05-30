import { Request, Response } from 'express';
import { SearchProjectsUsecase } from '../../usecases/project/SearchProjectsUsecase';

export class SearchProjectsController {
  constructor(private readonly searchProjectsUsecase: SearchProjectsUsecase) {}

  handle = async (request: Request, response: Response): Promise<Response> => {
    const search = request.query.search as string | undefined;
    if (!search) {
      return response.status(400).json({ message: 'Search parameter is required' }).send();
    }
    try {
      const searchResult = await this.searchProjectsUsecase.execute(search);
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
