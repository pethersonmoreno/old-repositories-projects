import React from 'react';
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
        <button type="button" className="cf-btn cf-btn--block cf-btn--text cf-btn--raised" onClick={signOut}>Sign Out</button>
      </div>
    </Box>
  );

export default NotAuthorized;
