import SigninNotAuthenticated from '../components/SigninNotAuthenticated';
import NotAuthorizedAuthenticated from '../components/NotAuthorizedAuthenticated';

const authRoutes = {
  '/notAuthorized': NotAuthorizedAuthenticated,
  '/signin': SigninNotAuthenticated
};

export default authRoutes;
