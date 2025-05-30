import withAuthorization from '../../../auth/hoc/withAuthorization';
import NotAuthorized from '../../../auth/components/NotAuthorized';

const NotAuthorizedAuthenticatedController = withAuthorization({ authenticated: true, isValidEmail: false }, '/cashFlows')(NotAuthorized);

export default NotAuthorizedAuthenticatedController;
