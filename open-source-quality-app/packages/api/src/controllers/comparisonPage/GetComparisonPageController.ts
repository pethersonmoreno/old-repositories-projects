import { Request, Response } from 'express';
import { GetComparisonPageUsecase } from '../../usecases/comparisonPage/GetComparisonPageUsecase';

export class GetComparisonPageController {
  constructor(private readonly getComparisonPageUsecase: GetComparisonPageUsecase) {}

  handle = async (request: Request, response: Response): Promise<Response> => {
    const slug = request.params.slug as string;
    try {
      const comparisonPage = await this.getComparisonPageUsecase.execute(slug);
      if (comparisonPage === null) {
        return response.status(404).json({ message: 'Comparision page not found' }).send();
      }
      return response.status(200).json(comparisonPage).send();
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
