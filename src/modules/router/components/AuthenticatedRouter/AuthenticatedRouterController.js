import React from 'react';
import SwitchRouterRoutes from '../../../utils/components/SwitchRouterRoutes';
import { authenticatedRoutes } from '../../constants';
import NotFound from '../../../utils/components/NotFound';

const AuthenticatedRouterController = props => {
  const routes = [
    ...Object.keys(authenticatedRoutes).map(key => ({
      path: key,
      component: authenticatedRoutes[key]
    })),
    { component: NotFound }
  ];
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SwitchRouterRoutes {...props} routes={routes} />
  );
};

export default AuthenticatedRouterController;
