import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch, Route, Redirect
} from 'react-router-dom';

const SwitchRouterRoutes = ({ routes, ...otherProps }) => (
  <Switch>
    {routes.map(route => (
      <Route
        key={route}
        path={route.path}
        exact={route.exact}
        render={props => {
          if (route.redirectTo) {
            return <Redirect to={route.redirectTo} />;
          }
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <route.component {...props} {...otherProps} />;
        }}
      />
    ))}
  </Switch>
);
SwitchRouterRoutes.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    exact: PropTypes.bool,
    component: PropTypes.func,
    redirectTo: PropTypes.string,
  })).isRequired
};

export default SwitchRouterRoutes;
