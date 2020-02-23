/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import './MenuItem.scss';

const MenuItemController = ({
  label, to, onClick
}) => (
  <Route path={to}>
    {({ match }) => {
      if (to) {
        return (
          <li className="md-list-item">
            <Link
              className="md-fake-btn md-pointer--hover md-fake-btn--no-outline md-list-tile md-text"
              to={to}
              onClick={onClick}
            >
              <div className="md-ink-container" />
              <div className="md-tile-content">
                <div className={`md-tile-text--primary ${match ? 'md-text--theme-primary' : 'md-text'}`}>{label}</div>
              </div>
            </Link>
          </li>
        );
      }
      return (
        <li className="md-list-item">
          <button
            type="button"
            className="cf-btn cf-btn--block cf-btn--text"
            onClick={onClick}
          >
            <div className="md-ink-container" />
            <div className="md-tile-content">
              <div className={`md-tile-text--primary ${match ? 'md-text--theme-primary' : 'md-text'}`}>{label}</div>
            </div>
          </button>
        </li>
      );
    }}
  </Route>
);

MenuItemController.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
};
export default MenuItemController;
