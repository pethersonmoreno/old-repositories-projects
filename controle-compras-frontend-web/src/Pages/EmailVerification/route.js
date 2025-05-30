import React from 'react';
import { Route } from 'react-router-dom';
import Component from './EmailVerificationForm';

const PREFIX_ROUTE = '/emailVerification';
export default <Route exact path={`${PREFIX_ROUTE}`} component={Component} />;
