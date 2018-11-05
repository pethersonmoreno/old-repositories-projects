import React from 'react'
import { Switch, Route } from 'react-router-dom'
import List from './List';
import Add from './Add';
import Edit from './Edit';

export const prefixRoute = '/category';
const routes = [
  <Route path={`${prefixRoute}/new`} component={Add}/>,
  <Route path={`${prefixRoute}/:id`} component={Edit}/>,
  <Route exact path={`${prefixRoute}`} component={List}/>,
];
export default <Route path={prefixRoute} component={()=>(
  <Switch>
    {routes}
  </Switch>
)} />