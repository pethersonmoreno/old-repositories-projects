import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { route as routeShipListItem } from './Item';
import { route as routeAdd } from './Add';
import { route as routeEdit } from './Edit';
import Component from './ShipListTabs';
import { route as routeNotFound } from '../NotFound';
import { PREFIX_ROUTE } from './constants';

export default (
  <Route
    path={PREFIX_ROUTE}
    component={() => (
      <Switch>
        {routeShipListItem}
        {routeAdd}
        {routeEdit}
        <Route exact path={`${PREFIX_ROUTE}`} component={Component} />
        {routeNotFound}
      </Switch>
    )}
  />
);
