import { Request, Response } from 'express';
import { GetProjectUsecase } from '../../usecases/project/GetProjectUsecase';

export class GetProjectController {
  constructor(private readonly getProjectUsecase: GetProjectUsecase) {}

  handle = async (request: Request, response: Response): Promise<Response> => {
    const projectId = request.params.projectId as string;
    try {
      const project = await this.getProjectUsecase.execute(projectId);
      if (project === null) {
        return response.status(404).json({ message: 'Project not found' }).send();
      }
      return response.status(200).json(project).send();
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
