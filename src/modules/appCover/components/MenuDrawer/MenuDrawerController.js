/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { signOut } from '../../../utils/api/auth';
import { hideMenu } from '../../actions';
import useAppState from '../../hooks/useAppState';
import MenuDrawerView from './MenuDrawerView';

const menuItems = [
  { label: 'Cash Flows', to: '/cashFlows' },
  { label: 'People', to: '/people' },
  { label: 'Cash Flow Descriptions', to: '/cashFlowDescriptions' },
  { label: 'Accounts', to: '/accounts' },
  { label: 'Sign Out', onClick: signOut },
];

const MenuDrawerController = () => {
  const [{ showMenu }, , unlinkState] = useAppState();

  useEffect(() => unlinkState, [unlinkState]);
  return (
    <MenuDrawerView
      visible={showMenu}
      onVisibilityChange={hideMenu}
      menuItems={menuItems}
    />
  );
};

export default MenuDrawerController;
