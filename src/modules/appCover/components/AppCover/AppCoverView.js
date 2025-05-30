import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'react-md';
import AppBar from '../AppBar';
import MenuDrawer from '../MenuDrawer';
import MenuButton from './MenuButton';

const AppCoverView = ({
  title,
  openMenu,
  children
}) => (
  <Paper>
    <AppBar
      title={title}
      nav={<MenuButton onClick={openMenu} />}
    />
    <Paper>
      <Paper style={{ marginTop: '80px' }}>
        {children}
      </Paper>
      <MenuDrawer />
    </Paper>
  </Paper>
);

AppCoverView.propTypes = {
  title: PropTypes.string.isRequired,
  openMenu: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default AppCoverView;
