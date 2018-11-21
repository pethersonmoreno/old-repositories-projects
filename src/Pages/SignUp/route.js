import React from 'react';
import { Route } from 'react-router-dom';
import Component from './SignUpForm';

const PREFIX_ROUTE = '/signup';
export default <Route exact path={`${PREFIX_ROUTE}`} component={Component} />;
