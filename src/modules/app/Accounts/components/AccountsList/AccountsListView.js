import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, FloatingActionButton } from '@morenobr/guideline-react';

const AccountsListView = ({
  add, edit, remove, list
}) => (
  <div className="cf-paper">
    <table className="cf-table">
      <thead>
        <tr>
          <th>Action</th>
          <th>Description</th>
          <th>Current Value</th>
        </tr>
      </thead>
      <tbody>
        {list.map(account => (
          <tr key={account.id}>
            <td>
              <IconButton icon="edit" onClick={edit(account)} />
              <IconButton icon="restore_from_trash" onClick={remove(account)} />
            </td>
            <td>{account.description}</td>
            <td>{account.currentValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <FloatingActionButton icon="add" onClick={add} />
  </div>
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
