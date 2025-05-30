import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  buttonSignInWith: {
    width: '145px',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    lineHeight: '20px',
    fontSize: '14px',
    marginBottom: '16px',
    padding: '8px',
    border: '1px solid transparent',
    borderRadius: '3px',
    cursor: 'pointer',
    fontWeight: 400,
    textDecoration: 'none',
    backgroundColor: '#fff',
    borderColor: '#e5e5e5',
    color: '#2e2e2e',
    transition:
      'background-color 100ms linear, border-color 100ms linear, color 100ms linear, box-shadow 100ms linear',
    '& ::before, & ::after': {
      boxSizing: 'border-box',
    },
    '&:focus, &:active': {
      backgroundColor: '#ececec',
      boxShadow: 'rgba(0,0,0,0.16)',
    },
    '&:hover, &:focus': {
      textDecoration: 'none',
      backgroundColor: '#f0f0f0',
      borderColor: '#e3e3e3',
      color: '#2e2e2e',
    },
    '&:active': {
      boxShadow: 'rgba(0,0,0,0.16)',
      backgroundColor: '#eaeaea',
      borderColor: '#e3e3e3',
      color: '#2e2e2e',
    },
    '& img': {
      width: '18px',
      height: '18px',
      marginRight: '16px',
      verticalAlign: 'middle',
      borderStyle: 'none',
    },
  },
});

const ButtonSignInWith = ({
  children, classes, imageSrc, alt, title, ...otherProps
}) => (
  <a className={classes.buttonSignInWith} {...otherProps}>
    <img src={imageSrc} alt={alt} title={title} />
    <span>{children}</span>
  </a>
);
ButtonSignInWith.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default withStyles(styles, { withTheme: true })(ButtonSignInWith);
