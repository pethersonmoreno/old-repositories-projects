/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import './AppBarView.scss';

const AppBarView = ({ title, nav }) => (
  <header className="cf-appbar cf-paper--2">
    {nav}
    <h2>{title}</h2>
  </header>
);
AppBarView.propTypes = {
  title: PropTypes.string.isRequired,
  nav: PropTypes.element.isRequired,
};

export default AppBarView;
