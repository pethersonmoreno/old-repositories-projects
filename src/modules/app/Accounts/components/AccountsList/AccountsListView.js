import React from 'react';
import PropTypes from 'prop-types';
import {
  DataTable, TableHeader, TableRow, TableColumn, TableBody
} from 'react-md';

const AccountsListView = ({
  add, edit, remove, list
}) => (
  <div className="cf-paper">
    <button type="button" className="cf-btn cf-btn--block cf-btn--icon" onClick={add}><i className="material-icons">add_circle</i></button>
    <DataTable plain>
      <TableHeader>
        <TableRow>
          <TableColumn>Action</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Current Value</TableColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map(account => (
          <TableRow key={account.id}>
            <TableColumn>
              <button
                type="button"
                className="cf-btn cf-btn--block cf-btn--icon"
                onClick={edit(account)}
              >
                <i className="material-icons">edit</i>
              </button>

              <button
                type="button"
                className="cf-btn cf-btn--block cf-btn--icon"
                onClick={remove(account)}
              >
                <i className="material-icons">restore_from_trash</i>
              </button>
            </TableColumn>
            <TableColumn>{account.description}</TableColumn>
            <TableColumn>{account.currentValue}</TableColumn>
          </TableRow>
        ))}
      </TableBody>
    </DataTable>
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
