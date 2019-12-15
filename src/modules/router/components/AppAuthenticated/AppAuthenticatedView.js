import React from 'react';
import AuthenticatedRouterController from '../AuthenticatedRouter/AuthenticatedRouterController';
import AppCover from '../../../appCover/components/AppCover';

const AppAuthenticatedView = () => (
  <AppCover>
    <AuthenticatedRouterController />
  </AppCover>
);

export default AppAuthenticatedView;
