import React from 'react'
import { Route } from 'react-router-dom'
import Edit from './Edit';
import {PREFIX_ROUTE} from '../constants'

export default <Route exact path={`${PREFIX_ROUTE}/:id`} component={Edit}/>