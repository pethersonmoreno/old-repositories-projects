/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from 'react-md';

const AppBarView = ({ title, nav, ...otherProps }) => (
  <Toolbar colored fixed title={title} nav={nav} {...otherProps} />
);
AppBarView.propTypes = {
  title: PropTypes.string.isRequired,
  nav: PropTypes.element.isRequired,
};

export default AppBarView;
