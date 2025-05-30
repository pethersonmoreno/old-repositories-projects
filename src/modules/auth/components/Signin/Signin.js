import React from 'react';
import { Paper } from 'react-md';
import ButtonSigninWith from '../ButtonSigninWith';
import googleIcon from './googleIcon.png';
import './Signin.scss';
import Box from '../../../utils/components/Box';
import { signin } from '../../actions/auth';

const Signin = () =>
  (
    <Box center fill>
      <Paper
        className="signin"
        zDepth={0}
        raiseOnHover
      >
        <h1>Cash Flow</h1>
        <ButtonSigninWith
          imageSrc={googleIcon}
          alt="Google"
          title="Sign in with Google"
          onClick={signin}
        >
          Continue with Google
        </ButtonSigninWith>
      </Paper>
    </Box>
  );

export default Signin;
