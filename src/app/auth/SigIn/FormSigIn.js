import React from 'react';
import {
  Form
} from 'grommet';
import ButtonSignInWith from './ButtonSignInWith';
import googleIcon from './googleIcon.png';

const FormSigIn = () => (
  <Form>
    <ButtonSignInWith
      imageSrc={googleIcon}
      alt="Google"
      title="Sign in with Google"
      onClick={() => alert('teste')}
    >
      Continue with Google
    </ButtonSignInWith>
  </Form>
);

export default FormSigIn;
