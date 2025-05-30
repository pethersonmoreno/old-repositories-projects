import React from 'react';
import { Route } from 'react-router-dom';
import Component from './ShipListItemEdit';
import { PREFIX_ROUTE } from '../constants';

export default <Route path={`${PREFIX_ROUTE}/:id`} component={Component} />;
