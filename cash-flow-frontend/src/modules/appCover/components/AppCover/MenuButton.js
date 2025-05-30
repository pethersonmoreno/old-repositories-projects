/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-md';

const MenuButton = ({ onClick, ...otherProps }) => (
  <Button icon onClick={onClick} {...otherProps}>menu</Button>
);
MenuButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MenuButton;
