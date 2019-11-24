import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Switch, Route
} from 'react-router-dom';
import CashFlowDescriptionList from './CashFlowDescriptionList';
import NotFound from '../../others/NotFound';
import { setPageTitle } from '../../actions/auth';
import CashFlowDescriptionForm from './CashFlowDescriptionForm';

const Router = ({ match }) => {
  useEffect(() => {
    setPageTitle('Cash Flow Descriptions');
  }, []);
  return (
    <Switch>
      <Route exact path={match.path} component={CashFlowDescriptionList} />
      <Route exact path={`${match.path}/edit/:id`} component={CashFlowDescriptionForm} />
      <Route exact path={`${match.path}/new`} component={CashFlowDescriptionForm} />
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
