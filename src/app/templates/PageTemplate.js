import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Paper } from 'react-md';
import AppBar from '../components/AppBar';
import SideBar from '../components/SideBar';
import useAuthState from '../hooks/useAuthState';
import { toggleSideBar } from '../actions/auth';

const PageTemplate = ({
  children
}) => {
  const [state, , unlinkState] = useAuthState();
  const { pageTitle } = state;
  useEffect(() => unlinkState);
  return (
    <Paper>
      <AppBar title={`Cash Flow${pageTitle ? ` - ${pageTitle}` : ''}`} nav={<Button icon onClick={toggleSideBar}>menu</Button>} />
      <Paper>
        <Paper style={{ marginTop: '80px' }}>
          {children}
        </Paper>
        <SideBar />
      </Paper>
    </Paper>
  );
};

PageTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageTemplate;
