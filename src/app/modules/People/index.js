import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch, Route
} from 'react-router-dom';
import PeopleList from './PeopleList';
import NotFound from '../../others/NotFound';

const Router = ({ match }) => (
  <Switch>
    <Route exact path={match.path} component={PeopleList} />
    <Route exact path={`${match.path}/teste`} component={() => <div>testando</div>} />
    <Route component={NotFound} />
  </Switch>
);

Router.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
};

export default Router;
