import React from 'react';
import PropTypes from 'prop-types';
import {
  Form
} from 'grommet';
import ButtonSignInWith from './ButtonSignInWith';
import googleIcon from './googleIcon.png';
import withAppStateActions from '../../hoc/withAppStateActions';

const FormSigIn = ({ signIn }) => (
  <Form>
    <ButtonSignInWith
      imageSrc={googleIcon}
      alt="Google"
      title="Sign in with Google"
      onClick={signIn}
    >
      Continue with Google
    </ButtonSignInWith>
  </Form>
);
FormSigIn.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default withAppStateActions(FormSigIn);
