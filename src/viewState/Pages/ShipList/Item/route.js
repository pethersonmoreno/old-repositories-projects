import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {route as routeNotFound} from '../../notFound';
import AddShipListItem from './Add';
import EditShipListItem from './Edit';
import {PREFIX_ROUTE} from './constants';
const routes = [
  <Route path={`${PREFIX_ROUTE}/new`} component={AddShipListItem}/>,
  <Route path={`${PREFIX_ROUTE}/:id`} component={EditShipListItem}/>,
  routeNotFound,
];
export default <Route path={PREFIX_ROUTE} component={()=>(
  <Switch>
    {routes}
  </Switch>
)} />