import React from 'react';
import {
  Box, Grommet, Heading, Button
} from 'grommet';

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

const NotAuthorized = () =>
  (
    <Grommet theme={theme} full>
      <Box fill>
        <Box flex align="center" justify="center">
          <Heading>You are not authorized</Heading>
          <Heading level={2}>Request Authorization</Heading>
          <Button
            label="Sign Out"
          />
        </Box>
      </Box>
    </Grommet>
  );

export default NotAuthorized;
