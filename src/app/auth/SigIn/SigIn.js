import React from 'react';
import {
  Box, Grommet, Heading
} from 'grommet';
import FormSigIn from './FormSigIn';

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

const SigIn = () =>
  (
    <Grommet theme={theme} full>
      <Box fill>
        <Box flex align="center" justify="center">
          <Heading>Cash Flow</Heading>
          <FormSigIn />
        </Box>
      </Box>
    </Grommet>
  );

export default SigIn;
