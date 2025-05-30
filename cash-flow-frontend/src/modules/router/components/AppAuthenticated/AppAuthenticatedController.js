import withAuthorization from '../../../auth/hoc/withAuthorization';
import AppAuthenticatedView from './AppAuthenticatedView';

const AppAuthenticatedController = withAuthorization(
  {
    authenticated: true,
    isValidEmail: true
  },
  '/'
)(AppAuthenticatedView);

export default AppAuthenticatedController;
