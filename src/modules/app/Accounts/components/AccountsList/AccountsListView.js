import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, DataTable, TableHeader, TableRow, TableColumn, TableBody
} from 'react-md';

const AccountsListView = ({
  add, edit, remove, list
}) => (
  <div className="cf-paper">
    <Button icon onClick={add}>add_circle</Button>
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
              <Button
                icon
                onClick={edit(account)}
              >
                  edit
              </Button>
              <Button
                icon
                onClick={remove(account)}
              >
                  restore_from_trash
              </Button>
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
