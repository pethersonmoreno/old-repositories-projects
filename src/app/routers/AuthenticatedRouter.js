import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch, Route
} from 'react-router-dom';
import NotFound from '../others/NotFound';

const AuthenticatedRouter = ({ children }) => (
  <Switch>
    <Route exact path="/people" component={() => <div>People</div>} />
    {children}
    <Route component={NotFound} />
  </Switch>
);

AuthenticatedRouter.propTypes = {
  children: PropTypes.string,
};
AuthenticatedRouter.defaultProps = {
  children: undefined,
};

export default AuthenticatedRouter;
