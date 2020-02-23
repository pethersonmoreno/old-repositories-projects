/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'react-md';
import MenuItemController from '../MenuItem/MenuItemController';
import './MenuDrawerView.scss';

const MenuDrawerView = ({ visible, onVisibilityChange, menuItems }) => (
  <Drawer
    type={Drawer.DrawerTypes.TEMPORARY}
    visible={visible}
    onVisibilityChange={onVisibilityChange}
    header={(
      <header className="cf-menubar">
        <h2>Menu</h2>
      </header>
    )}
    navItems={menuItems.map(item => (<MenuItemController key={item.label} {...item} />))}
  />
);
MenuDrawerView.propTypes = {
  visible: PropTypes.bool.isRequired,
  onVisibilityChange: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    to: PropTypes.string,
    onClick: PropTypes.func,
  })).isRequired
};

export default MenuDrawerView;
