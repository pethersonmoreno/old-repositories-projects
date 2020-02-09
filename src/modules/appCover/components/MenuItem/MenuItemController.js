/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import { FontIcon, ListItem } from 'react-md';

// eslint-disable-next-line react/prop-types
const ButtonTmp = ({ children, onClick }) => (
  <button type="button" className="cf-btn cf-btn--block cf-btn--text" onClick={onClick}>{children}</button>
);
/**
 * Due to the fact that react-router uses context and most of the components
 * in react-md use PureComponent, the matching won't work as expected since
 * the PureComponent will block the context updates. This is a simple wrapper
 * with Route to make sure that the active state is correctly applied after
 * an item has been clicked.
 */
const MenuItemController = ({
  label, to, onClick, icon, exact
}) => (
  <Route path={to} exact={exact}>
    {({ match }) => {
      let leftIcon;
      if (icon) {
        leftIcon = <FontIcon>{icon}</FontIcon>;
      }
      if (to) {
        return (
          <ListItem
            component={Link}
            active={!!match}
            to={to}
            primaryText={label}
            leftIcon={leftIcon}
          />
        );
      }
      return (
        <ListItem
          component={ButtonTmp}
          flat
          active={!!match}
          onClick={onClick}
          primaryText={label}
          leftIcon={leftIcon}
        />
      );
    }}
  </Route>
);

MenuItemController.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  exact: PropTypes.bool,
  icon: PropTypes.node,
};
export default MenuItemController;
