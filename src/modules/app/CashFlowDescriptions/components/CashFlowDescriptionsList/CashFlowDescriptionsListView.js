import React from 'react';
import PropTypes from 'prop-types';
import { FloatingActionButton, IconButton } from '@morenobr/guideline-react';

const CashFlowDescriptionsListView = ({
  add, edit, remove, list
}) => (
  <div className="cf-paper">
    <table className="cf-table">
      <thead>
        <tr>
          <th>Action</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {list.map(cashFlowDescription => (
          <tr key={cashFlowDescription.id}>
            <td>
              <IconButton icon="edit" onClick={edit(cashFlowDescription)} />
              <IconButton icon="restore_from_trash" onClick={remove(cashFlowDescription)} />
            </td>
            <td>{cashFlowDescription.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <FloatingActionButton icon="add" onClick={add} />
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
