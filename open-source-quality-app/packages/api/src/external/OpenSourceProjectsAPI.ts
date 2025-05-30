/* eslint-disable camelcase */
import { SimplifiedProject } from '../entities/SimplifiedProject';

export type TRepositoryGithub = {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
  };
  description: string;
  open_issues_count: number;
};

export interface OpenSourceProjectsAPI {
  search(search: string): Promise<SimplifiedProject[]>;
  findSimplifiedByFullname(fullName: string): Promise<SimplifiedProject | null>;
  findByFullname(fullName: string): Promise<TRepositoryGithub | null>;
}
