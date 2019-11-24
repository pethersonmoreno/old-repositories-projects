/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Toolbar } from 'react-md';

const AppBar = ({ title, nav, ...otherProps }) => (
  <Toolbar colored fixed title={title} nav={nav} {...otherProps} />
);

export default AppBar;
