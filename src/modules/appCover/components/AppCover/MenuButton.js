/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

const MenuButton = ({ onClick }) => (
  <button type="button" className="cf-btn cf-btn--block cf-btn--icon cf-text--inherit cf-btn--toolbar cf-toolbar--action-left" onClick={onClick}><i className="material-icons">menu</i></button>
);
MenuButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MenuButton;
