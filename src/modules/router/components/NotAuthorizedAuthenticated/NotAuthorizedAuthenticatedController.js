import React from 'react';
import useWithAuthorization from '../../../auth/hooks/useWithAuthorization';
import NotAuthorized from '../../../auth/components/NotAuthorized';

const NotAuthorizedAuthenticatedController = () => {
  const [isDifferent] = useWithAuthorization({ authenticated: true, isValidEmail: false }, '/cashFlows');
  if (isDifferent) {
    return null;
  }
  return <NotAuthorized />;
};

export default NotAuthorizedAuthenticatedController;
