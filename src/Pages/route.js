import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainAuthenticatedTemplate from 'Templates/MainAuthenticatedTemplate';
import { route as routeSignUp } from './SignUp';
import { route as routeSignIn } from './SignIn';
import { route as routeShipList } from './ShipList';
import { route as routeProduct } from './Product';
import { route as routeCategory } from './Category';
import { route as routeProductType } from './ProductType';
import { route as routeNotFound } from './NotFound';

export default (
  <Switch>
    <Route path="/" exact render={() => <Redirect to="/signin" />} />
    {routeSignUp}
    {routeSignIn}
    <MainAuthenticatedTemplate>
      <Switch>
        {routeShipList}
        {routeCategory}
        {routeProductType}
        {routeProduct}
        {routeNotFound}
      </Switch>
    </MainAuthenticatedTemplate>
  </Switch>
);
