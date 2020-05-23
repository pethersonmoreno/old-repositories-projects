/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MenuItemController from '../MenuItem/MenuItemController';
import './MenuDrawerView.scss';

const MenuDrawerView = ({ visible, onVisibilityChange, menuItems }) => {
  const [showing, setShowing] = useState(false);
  useEffect(() => {
    if (visible) {
      setShowing(true);
    } else {
      setTimeout(() => {
        setShowing(false);
      }, 300);
    }
  }, [visible]);
  return (
    <div>
      {showing && <div className={`cf-overlay ${visible ? 'cf-overlay--active' : ''}`} onClick={onVisibilityChange} onKeyPress={onVisibilityChange} role="button" aria-label="Close Menu" tabIndex="0" />}
      <nav className={`cf-paper--5 cf-drawer cf-drawer--transition-deceleration cf-drawer--fixed cf-drawer--left ${visible ? 'cf-drawer--active' : ''}`}>
        <header className="cf-menubar">
          <h2>Menu</h2>
        </header>
        <ul className="cf-list cf-list--drawer">
          {menuItems.map(item => (
            <MenuItemController
              key={item.label}
              {...item}
              onClick={(...params) => {
                if (item.onClick) { item.onClick(...params); }
                onVisibilityChange(...params);
              }}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};
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
