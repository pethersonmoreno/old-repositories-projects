import React from 'react';
import useWithAuthorization from '../../../auth/hooks/useWithAuthorization';
import AppAuthenticatedView from './AppAuthenticatedView';

const AppAuthenticatedController = () => {
  const [isDifferent] = useWithAuthorization({ authenticated: true, isValidEmail: true }, '/');
  if (isDifferent) {
    return null;
  }
  return <AppAuthenticatedView />;
};

export default AppAuthenticatedController;
