import React from 'react';
import AppAuthenticated from '../AppAuthenticated';
import SwitchRouterRoutes from '../../../utils/components/SwitchRouterRoutes';
import { authRoutes, DEFAULT_ROUTE } from '../../constants';

const MainRouterController = () => {
  const routes = [
    { path: '/', exact: true, redirectTo: DEFAULT_ROUTE },
    ...Object.keys(authRoutes).map(key => ({
      path: key,
      exact: true,
      component: authRoutes[key]
    })),
    { component: AppAuthenticated }
  ];
  return (
    <SwitchRouterRoutes routes={routes} />
  );
};

export default MainRouterController;
