import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { route as routeShipList } from './ShipList';
import { route as routeProduct } from './Product';
import { route as routeCategory } from './Category';
import { route as routeProductType } from './ProductType';
import { route as routeNotFound } from './NotFound';

export default (
  <Switch>
    <Route path="/" exact render={() => <Redirect to="/shipList" />} />
,
    {routeShipList}
    {routeCategory}
    {routeProductType}
    {routeProduct}
    {routeNotFound}
  </Switch>
);
