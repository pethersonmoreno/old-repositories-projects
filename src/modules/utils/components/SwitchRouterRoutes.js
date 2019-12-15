import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch, Route, Redirect
} from 'react-router-dom';

const SwitchRouterRoutes = ({ routes }) => (
  <Switch>
    {routes.map(route => {
      let render;
      if (route.redirectTo) {
        const redirectRender = () => <Redirect to={route.redirectTo} />;
        render = redirectRender;
      }
      return (
        <Route
          key={route}
          path={route.path}
          exact={route.exact}
          component={route.component}
          render={render}
        />
      );
    })}
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
