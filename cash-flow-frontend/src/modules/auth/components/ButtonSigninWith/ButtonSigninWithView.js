/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import './ButtonSigninWithView.scss';

const ButtonSigninWithView = ({
  children, imageSrc, alt, title, ...otherProps
}) => (
  <a className="buttonSigninWith" role="button" tabIndex="0" {...otherProps}>
    <img src={imageSrc} alt={alt} title={title} />
    <span>{children}</span>
  </a>
);
ButtonSigninWithView.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.string.isRequired,
};
ButtonSigninWithView.defaultProps = {
  alt: '',
  title: '',
};

export default ButtonSigninWithView;
