import React from 'react';
import {
  Switch, Route, Redirect
} from 'react-router-dom';
import SignIn from '../auth/SigIn/SignIn';
import AppAuthenticated from '../AppAuthenticated';
import NotAuthorized from '../auth/NotAuthorized';

const MainRouter = () => (
  <Switch>
    <Route path="/" exact render={() => <Redirect to="/signIn" />} />
    <Route exact path="/notAuthorized" component={NotAuthorized} />
    <Route exact path="/signIn" component={SignIn} />
    <Route component={AppAuthenticated} />
  </Switch>
);

export default MainRouter;
