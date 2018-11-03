import React from 'react'
import { Route } from 'react-router-dom'
import AddShipList from './Add';
import {PREFIX_ROUTE} from '../constants'

export default <Route exact path={`${PREFIX_ROUTE}/new`} component={AddShipList}/>