/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';
import { Button } from 'react-md';

const ButtonSignInWith = ({
  children, imageSrc, alt, title, ...otherProps
}) => (
  <Button
    raised
    className="buttonSign"
    {...otherProps}
  >
    <img src={imageSrc} alt={alt} title={title} />
    {children}
  </Button>
);
ButtonSignInWith.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.string.isRequired,
};
ButtonSignInWith.defaultProps = {
  alt: '',
  title: '',
};

export default ButtonSignInWith;
