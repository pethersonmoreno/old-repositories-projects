import { Request, Response } from 'express';
import { CreateComparisonPageUsecase } from '../../usecases/comparisonPage/CreateComparisonPageUsecase';

export class CreateComparisonPageController {
  constructor(private readonly createComparisonPageUsecase: CreateComparisonPageUsecase) {}

  handle = async (request: Request, response: Response): Promise<Response> => {
    const projectsIds = request.body as Array<string>;
    try {
      await this.createComparisonPageUsecase.execute(projectsIds);
      return response.status(200).send();
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
