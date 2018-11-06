import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { route as routeAdd } from './Add';
import { route as routeEdit } from './Edit';
import Component from './components';
import {route as routeNotFound} from '../NotFound'
import {PREFIX_ROUTE} from './constants'

export default <Route path={PREFIX_ROUTE} component={()=>(
  <Switch>
    {routeAdd}
    {routeEdit}
    <Route exact path={`${PREFIX_ROUTE}`} component={Component}/>
    {routeNotFound}
  </Switch>
)} />