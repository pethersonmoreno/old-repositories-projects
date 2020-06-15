import React from 'react';
import { Button } from '@morenobr/guideline-react';
import { signOut } from '../../../utils/api/auth';
import Box from '../../../utils/components/Box';
import './NotAuthorized.scss';

const NotAuthorized = () =>
  (
    <Box center fill>
      <div
        className="cf-paper notAuthorized"
        zDepth={0}
        raiseOnHover
      >
        <h1>You are not authorized</h1>
        <h2>Request Authorization</h2>
        <Button raised label="Sign Out" onClick={signOut} />
      </div>
    </Box>
  );

export default NotAuthorized;
