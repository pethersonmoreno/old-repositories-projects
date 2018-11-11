import React from 'react';
import { Route } from 'react-router-dom';
import Component from './ProductTypeEdit';
import { PREFIX_ROUTE } from '../constants';

export default <Route exact path={`${PREFIX_ROUTE}/:id(\\d+)`} component={Component} />;
