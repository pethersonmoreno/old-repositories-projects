import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Button, DataTable, TableHeader, TableRow, TableColumn, TableBody
} from 'react-md';

const CashFlowDescriptionsListView = ({
  add, edit, remove, list
}) => (
  <div className="cf-paper">
    <button type="button" className="cf-btn cf-btn--block cf-btn--icon" onClick={add}><i className="material-icons">add_circle</i></button>
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
              <button
                type="button"
                className="cf-btn cf-btn--block cf-btn--icon"
                onClick={edit(cashFlowDescription)}
              >
                <i className="material-icons">edit</i>
              </button>

              <button
                type="button"
                className="cf-btn cf-btn--block cf-btn--icon"
                onClick={remove(cashFlowDescription)}
              >
                <i className="material-icons">restore_from_trash</i>
              </button>
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
