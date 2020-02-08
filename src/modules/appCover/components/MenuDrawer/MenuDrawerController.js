/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../utils/api/auth';
import { hideMenu } from '../../actions/actionsApp';
import { useShowMenu } from '../../selectors/selectorsApp';
import MenuDrawerView from './MenuDrawerView';

const menuItems = [
  { label: 'Cash Flows', to: '/cashFlows' },
  { label: 'Cash Flows Report', to: '/cashFlows/report' },
  { label: 'People', to: '/people' },
  { label: 'Cash Flow Descriptions', to: '/cashFlowDescriptions' },
  { label: 'Accounts', to: '/accounts' },
  { label: 'Sign Out', onClick: signOut },
];

const MenuDrawerController = () => {
  const dispatch = useDispatch();
  const showMenu = useShowMenu();
  return (
    <MenuDrawerView
      visible={showMenu}
      onVisibilityChange={() => dispatch(hideMenu())}
      menuItems={menuItems}
    />
  );
};

export default MenuDrawerController;
