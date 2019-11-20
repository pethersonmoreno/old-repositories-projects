/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button
} from 'grommet';
import './Button.scss';

const ButtonSignInWith = ({
  children, imageSrc, alt, title, ...otherProps
}) => (
  <Button
    className="buttonSign"
    plain
    icon={<img src={imageSrc} alt={alt} title={title} />}
    label={children}
    {...otherProps}
  />
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
