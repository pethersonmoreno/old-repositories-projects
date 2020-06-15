import React from 'react';
import { useDispatch } from 'react-redux';
import {
  ListGroup, ListGroupItem, List, ListItem, ListDivider
} from '@morenobr/guideline-react';
import { signOut } from '../../../utils/api/auth';
import { hideMenu } from '../../actions/actionsApp';

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
  return (
    <ListGroup>
      <ListGroupItem header="Menu">
        <List asNavigation>
          <ListDivider asNavigation />
          {menuItems.map(item => (
            <ListItem
              key={item.label}
              href={item.to ? item.to : '#'}
              text={item.label}
              onClick={(...params) => {
                if (item.onClick) { item.onClick(...params); }
                dispatch(hideMenu());
              }}
            />
          ))}
        </List>
      </ListGroupItem>
    </ListGroup>
  );
};

export default MenuDrawerController;
