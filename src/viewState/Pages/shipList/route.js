import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { route as routeShipListItem } from './item';
import {route as routeNotFound} from '../notFound'
import DetailedTabsShipList from './DetailedTabs';
import AddShipList from './Add';
import EditShipList from './Edit';
import {prefixRoute} from './constants'
const routes = [
  <Route exact path={`${prefixRoute}/new`} component={AddShipList}/>,
  routeShipListItem,
  <Route exact path={`${prefixRoute}/:id`} component={EditShipList}/>,
  <Route exact path={`${prefixRoute}`} component={DetailedTabsShipList}/>,
  routeNotFound,
];
export default <Route path={prefixRoute} component={()=>(
  <Switch>
    {routes}
  </Switch>
)} />