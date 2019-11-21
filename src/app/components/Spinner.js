import React from 'react';
import SyncLoader from 'react-spinners/ClipLoader';
import { Box } from 'grommet';

const Spinner = () => (
  <Box fill>
    <Box flex align="center" justify="center">
      <SyncLoader
        sizeUnit="px"
        size={150}
        color="#123abc"
        loading
      />
    </Box>
  </Box>
);

export default Spinner;
