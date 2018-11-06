import React from 'react'
import { Route } from 'react-router-dom'
import Component from './components';
import {PREFIX_ROUTE} from '../constants';
export default <Route path={`${PREFIX_ROUTE}/new`} component={Component}/>