import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '../AppBar';
import MenuDrawer from '../MenuDrawer';
import MenuButton from './MenuButton';

const AppCoverView = ({
  title,
  openMenu,
  children
}) => (
  <div className="cf-paper">
    <AppBar
      title={title}
      nav={(<MenuButton onClick={openMenu} />)}
    />
    <div className="cf-paper">
      <div className="cf-paper" style={{ marginTop: '80px' }}>
        {children}
      </div>
      <MenuDrawer />
    </div>
  </div>
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
