import React from 'react';
import { Paper } from 'react-md';
import ButtonSignInWith from './ButtonSignInWith';
import googleIcon from './googleIcon.png';
import { signIn } from '../../actions/auth';

const FormSigIn = () => (
  <Paper
    zDepth={0}
    raiseOnHover
  >
    <ButtonSignInWith
      imageSrc={googleIcon}
      alt="Google"
      title="Sign in with Google"
      onClick={signIn}
    >
      Continue with Google
    </ButtonSignInWith>
  </Paper>
);

export default FormSigIn;
