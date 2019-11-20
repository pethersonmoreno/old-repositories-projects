import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch, Route, Redirect, BrowserRouter, HashRouter
} from 'react-router-dom';
import SigIn from '../auth/SigIn/SigIn';


const NavigationRouter = process.env.NODE_ENV !== 'development' ? HashRouter : BrowserRouter;

const MainRouter = ({ children }) => (
  <NavigationRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/signIn" />} />
      <Route exact path="/signIn" component={SigIn} />
      {children}
    </Switch>
  </NavigationRouter>
);

MainRouter.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainRouter;
