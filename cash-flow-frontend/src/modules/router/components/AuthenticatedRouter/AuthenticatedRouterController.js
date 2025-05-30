import React from 'react';
import SwitchRouterRoutes from '../../../utils/components/SwitchRouterRoutes';
import { authenticatedRoutes } from '../../constants';
import NotFound from '../../../utils/components/NotFound';

const AuthenticatedRouterController = () => {
  const routes = [
    ...Object.keys(authenticatedRoutes).map(key => ({
      path: key,
      component: authenticatedRoutes[key]
    })),
    { component: NotFound }
  ];
  return (
    <SwitchRouterRoutes routes={routes} />
  );
};

export default AuthenticatedRouterController;
