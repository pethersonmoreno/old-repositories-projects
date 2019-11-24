import React from 'react';
import {
  Switch, Route, Redirect
} from 'react-router-dom';
import SigIn from '../auth/SigIn/SigIn';
import AppAuthenticated from '../AppAuthenticated';
import NotAuthorized from '../auth/NotAuthorized';

const MainRouter = () => (
  <Switch>
    <Route path="/" exact render={() => <Redirect to="/signIn" />} />
    <Route exact path="/notAuthorized" component={NotAuthorized} />
    <Route exact path="/signIn" component={SigIn} />
    <Route component={AppAuthenticated} />
  </Switch>
);

export default MainRouter;
