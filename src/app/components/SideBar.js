/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Toolbar, Drawer } from 'react-md';
import useAuthState from '../hooks/useAuthState';
import { hideSideBar } from '../actions/auth';
import NavItemLink from './NavItemLink';
import { signOut } from '../../api/auth';

const menuItems = [
  { label: 'Cash Flows', to: '/cashFlows' },
  { label: 'People', to: '/people' },
  { label: 'Cash Flow Descriptions', to: '/cashFlowDescriptions' },
  { label: 'Accounts', to: '/accounts' },
  { label: 'Sign Out', onClick: signOut },
];

const SideBar = () => {
  const [state, , unlinkState] = useAuthState();
  const { showSidebar } = state;

  useEffect(() => unlinkState);
  return (
    <Drawer
      type={Drawer.DrawerTypes.TEMPORARY}
      visible={showSidebar}
      onVisibilityChange={hideSideBar}
      header={<Toolbar title="Menu" />}
      navItems={menuItems.map(item => (<NavItemLink key={item.label} {...item} />))}
    />
  );
};

export default SideBar;
