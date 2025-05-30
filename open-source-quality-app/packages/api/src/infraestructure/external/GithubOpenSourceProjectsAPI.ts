import axios from 'axios';
import { SimplifiedProject } from '../../entities/SimplifiedProject';
import { OpenSourceProjectsAPI, TRepositoryGithub } from '../../external/OpenSourceProjectsAPI';

const BASE_GITHUB_API = 'https://api.github.com';

const axiosApiGithub = axios.create({
  baseURL: BASE_GITHUB_API,
});

type TSearchResultGithub = {
  // eslint-disable-next-line camelcase
  total_count: number;
  // eslint-disable-next-line camelcase
  incomplete_results: boolean;
  items: TRepositoryGithub[];
};

export class GithubOpenSourceProjectsAPI implements OpenSourceProjectsAPI {
  search = async (search: string): Promise<SimplifiedProject[]> => {
    const result = (await axiosApiGithub.get(`/search/repositories?q=${encodeURIComponent(search)}`))
      .data as TSearchResultGithub;
    return result.items.map(
      (item) =>
        new SimplifiedProject({
          fullName: item.full_name,
          owner: item.owner.login,
          name: item.name,
          description: item.description,
        }),
    );
  };

  findByFullname = async (fullName: string): Promise<TRepositoryGithub | null> => {
    try {
      return (await axiosApiGithub.get(`/repos/${fullName}`)).data as TRepositoryGithub;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  };

  async findSimplifiedByFullname(fullName: string): Promise<SimplifiedProject | null> {
    const result = await this.findByFullname(fullName);
    if (result === null) {
      return null;
    }
    return new SimplifiedProject({
      fullName: result.full_name,
      owner: result.owner.login,
      name: result.name,
      description: result.description,
    });
  }
}
