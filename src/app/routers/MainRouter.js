import React from 'react';
import {
  Switch, Route, Redirect, BrowserRouter, HashRouter
} from 'react-router-dom';
import SigIn from '../auth/SigIn/SigIn';
import AppAuthenticated from '../AppAuthenticated';
import NotAuthorized from '../auth/NotAuthorized';

const NavigationRouter = process.env.NODE_ENV !== 'development' ? HashRouter : BrowserRouter;

const MainRouter = () => (
  <NavigationRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/signIn" />} />
      <Route exact path="/notAuthorized" component={NotAuthorized} />
      <Route exact path="/signIn" component={SigIn} />
      <Route component={AppAuthenticated} />
    </Switch>
  </NavigationRouter>
);

export default MainRouter;
