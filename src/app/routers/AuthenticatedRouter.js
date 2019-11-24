import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch, Route
} from 'react-router-dom';
import NotFound from '../others/NotFound';
import People from '../modules/People';
import CashFlowDescriptions from '../modules/CashFlowDescriptions';

const AuthenticatedRouter = ({ children }) => (
  <Switch>
    <Route path="/people" component={People} />
    <Route path="/cashFlowDescriptions" component={CashFlowDescriptions} />
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
