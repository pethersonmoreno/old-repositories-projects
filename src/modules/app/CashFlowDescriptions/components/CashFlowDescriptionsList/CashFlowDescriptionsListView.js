import React from 'react';
import PropTypes from 'prop-types';

const CashFlowDescriptionsListView = ({
  add, edit, remove, list
}) => (
  <div className="cf-paper">
    <button type="button" className="cf-btn cf-btn--block cf-btn--icon" onClick={add}><i className="material-icons">add_circle</i></button>
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
            </td>
            <td>{cashFlowDescription.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
