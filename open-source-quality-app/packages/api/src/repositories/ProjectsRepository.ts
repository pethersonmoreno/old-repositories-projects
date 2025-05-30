import { Project } from '../entities/Project';

export interface ProjectsRepository {
  create(project: Project): Promise<void>;
  update(project: Project): Promise<void>;

  findById(id: string): Promise<Project | null>;
}
