import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton, List, ListItem, ListDivider
} from '@morenobr/guideline-react';

const AccountsListView = ({
  add, edit, remove, list
}) => (
  <List twoLine>
    <ListItem
      text="Account"
      secondaryText="Current value"
      disabled
      contentRight={<IconButton secondary icon="add_circle" onClick={add} />}
    />
    {list.map((account, index) => (
      <>
        {index > 0 && <ListDivider asItem />}
        <ListItem
          key={account.id}
          text={account.description}
          secondaryText={Number(account.currentValue).toFixed(2)}
          onClick={edit(account)}
          contentRight={<IconButton primary icon="delete" onClick={remove(account)} />}
        />
      </>
    ))}
  </List>
);

AccountsListView.propTypes = {
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currentValue: PropTypes.number.isRequired,
  })).isRequired,
};

export default AccountsListView;
