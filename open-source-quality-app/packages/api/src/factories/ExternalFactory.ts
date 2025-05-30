import { OpenSourceProjectsAPI } from '../external/OpenSourceProjectsAPI';

export interface ExternalFactory {
  createOpenSourceProjectsAPI(): OpenSourceProjectsAPI;
}
