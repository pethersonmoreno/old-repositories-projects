import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button,
  Heading, Grommet,
} from 'grommet';
import { Notification } from 'grommet-icons';
import AppBar from '../components/AppBar';
import SideBar from '../components/SideBar';
import withAppStateActions from '../hoc/withAppStateActions';

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

const PageTemplate = ({
  toggleSideBar, children
}) => (
  <Grommet theme={theme} full>
    <Box fill>
      <AppBar>
        <Heading level="3" margin="none">My App</Heading>
        <Button icon={<Notification />} onClick={toggleSideBar} />
      </AppBar>
      <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
        <Box flex>
          {children}
        </Box>
        <SideBar />
      </Box>
    </Box>
  </Grommet>
);

PageTemplate.propTypes = {
  toggleSideBar: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default withAppStateActions(PageTemplate);
