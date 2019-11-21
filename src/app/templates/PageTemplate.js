import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button,
  Heading,
} from 'grommet';
import { Notification } from 'grommet-icons';
import AppBar from '../components/AppBar';
import SideBar from '../components/SideBar';
import withAppStateActions from '../hoc/withAppStateActions';

const PageTemplate = ({
  toggleSideBar, children
}) => (
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
);

PageTemplate.propTypes = {
  toggleSideBar: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default withAppStateActions(PageTemplate);
