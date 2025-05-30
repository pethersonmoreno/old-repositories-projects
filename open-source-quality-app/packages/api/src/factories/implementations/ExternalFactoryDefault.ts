import { OpenSourceProjectsAPI } from '../../external/OpenSourceProjectsAPI';
import { GithubOpenSourceProjectsAPI } from '../../infraestructure/external/GithubOpenSourceProjectsAPI';
import { ExternalFactory } from '../ExternalFactory';

export class ExternalFactoryDefault implements ExternalFactory {
  createOpenSourceProjectsAPI = (): OpenSourceProjectsAPI => new GithubOpenSourceProjectsAPI();
}
