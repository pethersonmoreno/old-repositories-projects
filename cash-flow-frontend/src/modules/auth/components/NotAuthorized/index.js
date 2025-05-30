import React from 'react';
import { Button, Paper } from 'react-md';
import { signOut } from '../../../utils/api/auth';
import Box from '../../../utils/components/Box';
import './NotAuthorized.scss';

const NotAuthorized = () =>
  (
    <Box center fill>
      <Paper
        className="notAuthorized"
        zDepth={0}
        raiseOnHover
      >
        <h1>You are not authorized</h1>
        <h2>Request Authorization</h2>
        <Button
          raised
          onClick={signOut}
        >
        Sign Out
        </Button>
      </Paper>
    </Box>
  );

export default NotAuthorized;
