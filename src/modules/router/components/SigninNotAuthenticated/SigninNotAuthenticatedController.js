import React from 'react';
import useWithAuthorization from '../../../auth/hooks/useWithAuthorization';
import Signin from '../../../auth/components/Signin';

const SigninNotAuthenticatedController = () => {
  const [isDifferent] = useWithAuthorization({ authenticated: false }, '/notAuthorized');
  if (isDifferent) {
    return null;
  }
  return <Signin />;
};

export default SigninNotAuthenticatedController;
