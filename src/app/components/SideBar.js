import React from 'react';
import {
  Box, Button, Collapsible,
  Layer, ResponsiveContext
} from 'grommet';
import { FormClose } from 'grommet-icons';
import SideBarContent from './SideBarContent';
import useAuthState from '../states/useAuthState';
import { hideSideBar } from '../actions/auth';

const SideBar = () => {
  const [state] = useAuthState();
  const { showSidebar } = state;
  return (
    <ResponsiveContext.Consumer>
      {size => ((!showSidebar || size !== 'small') ? (
        <Collapsible direction="horizontal" open={showSidebar}>
          <Box
            flex
            width="medium"
            elevation="small"
            background="light-2"
            align="center"
            justify="center"
          >
            <SideBarContent />
          </Box>
        </Collapsible>
      )
        : (
          <Layer>
            <Box
              background="light-2"
              tag="header"
              justify="end"
              align="center"
              direction="row"
            >
              <Button
                icon={<FormClose />}
                onClick={hideSideBar}
              />
            </Box>
            <Box
              fill
              background="light-2"
              align="center"
              justify="center"
            >
              <SideBarContent />
            </Box>
          </Layer>
        ))}
    </ResponsiveContext.Consumer>
  );
};

export default SideBar;
