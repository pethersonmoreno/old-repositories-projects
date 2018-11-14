import React from 'react';
import { Route } from 'react-router-dom';
import Component from './CategoryAdd';
import { PREFIX_ROUTE } from '../constants';

export default <Route exact path={`${PREFIX_ROUTE}/new`} component={Component} />;
