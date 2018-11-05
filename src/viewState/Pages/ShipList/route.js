import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { route as routeShipListItem } from './item';
import {route as routeNotFound} from '../notFound'
import { route as routeAdd } from './Add';
import { route as routeEdit } from './Edit';
import Component from './components';
import {PREFIX_ROUTE} from './constants'

const routes = [
  routeShipListItem,
  routeAdd,
  routeEdit,
  <Route exact path={`${PREFIX_ROUTE}`} component={Component}/>,
  routeNotFound,
];
export default <Route path={PREFIX_ROUTE} component={()=>(
  <Switch>
    {routes}
  </Switch>
)} />