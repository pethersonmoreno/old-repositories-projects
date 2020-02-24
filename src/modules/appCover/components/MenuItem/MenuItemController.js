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
          <li className="cf-list-item">
            <Link
              className="cf-fake-btn cf-pointer--hover cf-fake-btn--no-outline cf-list-tile cf-text"
              to={to}
              onClick={onClick}
            >
              <div className="cf-ink-container" />
              <div className="cf-tile-content">
                <div className={`cf-tile-text--primary ${match ? 'cf-text--theme-primary' : 'cf-text'}`}>{label}</div>
              </div>
            </Link>
          </li>
        );
      }
      return (
        <li className="cf-list-item">
          <button
            type="button"
            className="cf-fake-btn cf-list-tile cf-btn cf-btn--block cf-btn--text"
            onClick={onClick}
          >
            <div className="cf-ink-container" />
            <div className="cf-tile-content">
              <div className={`cf-tile-text--primary ${match ? 'cf-text--theme-primary' : 'cf-text'}`}>{label}</div>
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
