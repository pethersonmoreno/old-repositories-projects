import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Switch, Route
} from 'react-router-dom';
import PeopleList from './PeopleList';
import NotFound from '../../others/NotFound';
import { setPageTitle } from '../../actions/auth';
import PeopleForm from './PeopleForm';

const Router = ({ match }) => {
  useEffect(() => {
    setPageTitle('People');
  }, []);
  return (
    <Switch>
      <Route exact path={match.path} component={PeopleList} />
      <Route exact path={`${match.path}/edit/:id`} component={PeopleForm} />
      <Route exact path={`${match.path}/new`} component={PeopleForm} />
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
