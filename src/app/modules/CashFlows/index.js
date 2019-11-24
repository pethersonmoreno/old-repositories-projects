import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Switch, Route
} from 'react-router-dom';
import CashFlowsList from './CashFlowsList';
import NotFound from '../../others/NotFound';
import { setPageTitle } from '../../actions/auth';
import CashFlowForm from './CashFlowForm';

const Router = ({ match }) => {
  useEffect(() => {
    setPageTitle('Cash Flows');
  }, []);
  return (
    <Switch>
      <Route exact path={match.path} component={CashFlowsList} />
      <Route exact path={`${match.path}/edit/:id`} component={CashFlowForm} />
      <Route exact path={`${match.path}/new`} component={CashFlowForm} />
      <Route component={NotFound} />
    </Switch>
  );
};

Router.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
};

export default Router;
