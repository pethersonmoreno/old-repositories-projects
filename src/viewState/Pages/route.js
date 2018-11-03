import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import {route as routeShipList} from './shipList'
import {route as routeProduct} from './product'
import {route as routeCategory} from './category'
import {route as routeProductType} from './productType'
import {route as routeNotFound} from './notFound'


const routes = [
  <Route path={`/`} exact render={() => <Redirect to="/shipList" />} />,
  routeShipList,
  routeCategory,
  routeProductType,
  routeProduct,
  routeNotFound,
];
export default <Switch>{routes}</Switch>