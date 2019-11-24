import React from 'react';
import { Paper } from 'react-md';
import withAuthorization from '../../hoc/withAuthorization';
import ButtonSignInWith from './ButtonSignInWith';
import googleIcon from './googleIcon.png';
import { signIn } from '../../actions/auth';
import './SignIn.scss';
import Box from '../../components/Box';

const SigIn = () =>
  (
    <Box center fill>
      <Paper
        className="signIn"
        zDepth={0}
        raiseOnHover
      >
        <h1>Cash Flow</h1>
        <ButtonSignInWith
          imageSrc={googleIcon}
          alt="Google"
          title="Sign in with Google"
          onClick={signIn}
        >
          Continue with Google
        </ButtonSignInWith>
      </Paper>
    </Box>
  );

export default withAuthorization({ authenticated: false }, '/notAuthorized')(SigIn);
