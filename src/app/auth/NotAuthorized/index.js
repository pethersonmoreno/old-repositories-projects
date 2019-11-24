import React from 'react';
import { Button, Paper } from 'react-md';
import { signOut } from '../../../api/auth';
import withAuthorization from '../../hoc/withAuthorization';

const NotAuthorized = () =>
  (
    <Paper align="center" justify="center">
      <h1>You are not authorized</h1>
      <h2>Request Authorization</h2>
      <Button
        raised
        onClick={signOut}
      >
        Sign Out
      </Button>
    </Paper>
  );

export default withAuthorization({ authenticated: true, isValidEmail: false }, '/cashFlows')(NotAuthorized);
