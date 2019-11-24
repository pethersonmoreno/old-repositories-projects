import React from 'react';
import { Box } from 'grommet';
import SidebarButton from './SideBarButton';
import { signOut } from '../../api/auth';

const SideBarContent = () => (
  <Box fill>
    <SidebarButton label="People" to="/people" />
    <SidebarButton label="Cash Flow Descriptions" to="/cashFlowDescriptions" />
    <SidebarButton label="Accounts" to="/accounts" />
    <SidebarButton label="Sign Out" onClick={signOut} />
  </Box>
);

export default SideBarContent;
