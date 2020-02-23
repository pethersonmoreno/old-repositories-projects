import React from 'react';
import PropTypes from 'prop-types';

const AccountsListView = ({
  add, edit, remove, list
}) => (
  <div className="cf-paper">
    <button type="button" className="cf-btn cf-btn--block cf-btn--icon" onClick={add}><i className="material-icons">add_circle</i></button>
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
            </td>
            <td>{account.description}</td>
            <td>{account.currentValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
