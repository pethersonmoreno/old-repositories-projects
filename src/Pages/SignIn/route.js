import React from 'react';
import { Route } from 'react-router-dom';
import Component from './SignInForm';

const PREFIX_ROUTE = '/signin';
export default <Route exact path={`${PREFIX_ROUTE}`} component={Component} />;
