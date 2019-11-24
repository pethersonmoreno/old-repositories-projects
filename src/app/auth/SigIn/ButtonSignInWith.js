/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import './ButtonSignInWith.scss';

const ButtonSignInWith = ({
  children, imageSrc, alt, title, ...otherProps
}) => (
  <a className="buttonSign" role="button" tabIndex="0" {...otherProps}>
    <img src={imageSrc} alt={alt} title={title} />
    <span>{children}</span>
  </a>
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
