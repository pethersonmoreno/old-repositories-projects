import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button,
  Heading,
} from 'grommet';
import { Notification } from 'grommet-icons';
import AppBar from '../components/AppBar';
import SideBar from '../components/SideBar';
import useAuthState from '../states/useAuthState';
import { toggleSideBar } from '../actions/auth';

const PageTemplate = ({
  children
}) => {
  const [state, , unlinkState] = useAuthState();
  const { pageTitle } = state;
  useEffect(() => unlinkState);
  return (
    <Box fill>
      <AppBar>
        <Heading level="3" margin="none">
        Cash Flow
          {pageTitle ? ` - ${pageTitle}` : ''}
        </Heading>
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
};

PageTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageTemplate;
