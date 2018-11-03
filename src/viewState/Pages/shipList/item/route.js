import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {route as routeNotFound} from '../../notFound';
import AddShipListItem from './Add';
import EditShipListItem from './Edit';
import {prefixRoute as prefixRouteDad} from '../constants';

const prefixRoute = prefixRouteDad+'/:shipListId/item';
const routes = [
  <Route path={`${prefixRoute}/new`} component={AddShipListItem}/>,
  <Route path={`${prefixRoute}/:id`} component={EditShipListItem}/>,
  routeNotFound,
];
export default <Route path={prefixRoute} component={()=>(
  <Switch>
    {routes}
  </Switch>
)} />