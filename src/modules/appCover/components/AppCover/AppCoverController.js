import React from 'react';
import PropTypes from 'prop-types';
import AppCoverView from './AppCoverView';

const AppCoverController = ({
  children
}) => (
  <AppCoverView>{children}</AppCoverView>
);

AppCoverController.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default AppCoverController;
