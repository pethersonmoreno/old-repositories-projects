import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonSignInWith from '../ButtonSignInWith';
import { signInGoogleWithRedirect } from '../../../api/auth';
import googleIcon from './googleIcon.png';

const styles = () => ({
  container: {
    display: 'block',
    margintop: '15px',
    backgroundColor: '#ffffff',
    boxshadow: '0 0 0 1px #e5e5e5',
    border: '1px solid transparent',
    borderColor: '#e5e5e5',
    borderRadius: '3px',
    borderBottomRightRadius: '2px',
    borderBottomLeftRadius: '2px',
    padding: '15px',
    '& ::before, & ::after': {
      boxSizing: 'border-box'
    }
  },
  row: {
    display: 'flex',
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    display: 'flex',
    width: '100%',
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: '0.5rem'
  }
});
const SignInWithBox = ({ classes }) => (
  <div className={classes.container}>
    <div className={classes.row}>
      <p className={classes.label}>Logar com</p>
    </div>
    <div className={classes.row}>
      <ButtonSignInWith
        imageSrc={googleIcon}
        alt="Google"
        title="Sign in with Google"
        onClick={signInGoogleWithRedirect}
      >
        Google
      </ButtonSignInWith>
    </div>
  </div>
);
SignInWithBox.propTypes = {
  classes: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};
export default withStyles(styles)(SignInWithBox);
