import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Button, DataTable, TableHeader, TableRow, TableColumn, TableBody
} from 'react-md';

const CashFlowDescriptionsListView = ({
  add, edit, remove, list
}) => (
  <div className="cf-paper">
    <Button icon onClick={add}>add_circle</Button>
    <DataTable plain>
      <TableHeader>
        <TableRow>
          <TableColumn>Action</TableColumn>
          <TableColumn>Name</TableColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map(cashFlowDescription => (
          <TableRow key={cashFlowDescription.id}>
            <TableColumn>
              <Button
                icon
                onClick={edit(cashFlowDescription)}
              >
                  edit
              </Button>
              <Button
                icon
                onClick={remove(cashFlowDescription)}
              >
                  restore_from_trash
              </Button>
            </TableColumn>
            <TableColumn>{cashFlowDescription.name}</TableColumn>
          </TableRow>
        ))}
      </TableBody>
    </DataTable>
  </div>
);

CashFlowDescriptionsListView.propTypes = {
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default CashFlowDescriptionsListView;
