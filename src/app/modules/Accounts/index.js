import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Switch, Route
} from 'react-router-dom';
import AccountsList from './AccountsList';
import NotFound from '../../others/NotFound';
import { setPageTitle } from '../../actions/auth';
import AccountForm from './AccountForm';

const Router = ({ match }) => {
  useEffect(() => {
    setPageTitle('Accounts');
  }, []);
  return (
    <Switch>
      <Route exact path={match.path} component={AccountsList} />
      <Route exact path={`${match.path}/edit/:id`} component={AccountForm} />
      <Route exact path={`${match.path}/new`} component={AccountForm} />
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
