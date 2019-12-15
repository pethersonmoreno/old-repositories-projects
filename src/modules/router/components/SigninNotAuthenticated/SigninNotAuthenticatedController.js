import withAuthorization from '../../../auth/hoc/withAuthorization';
import Signin from '../../../auth/components/Signin';

const SigninNotAuthenticatedController = withAuthorization({ authenticated: false }, '/notAuthorized')(Signin);

export default SigninNotAuthenticatedController;
