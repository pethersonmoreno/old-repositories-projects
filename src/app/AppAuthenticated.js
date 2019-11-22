import React from 'react';
import AuthenticatedRouter from './routers/AuthenticatedRouter';
import PageTemplate from './templates/PageTemplate';
import withAuthorization from './hoc/withAuthorization';

const AppAuthenticated = () => (
  <PageTemplate>
    <AuthenticatedRouter />
  </PageTemplate>
);

export default withAuthorization({ authenticated: true, isValidEmail: true }, '/')(AppAuthenticated);
