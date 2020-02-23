import React from 'react';
import PropTypes from 'prop-types';

const PeopleListView = ({
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
        {list.map(person => (
          <tr key={person.id}>
            <td>
              <button
                type="button"
                className="cf-btn cf-btn--block cf-btn--icon"
                onClick={edit(person)}
              >
                <i className="material-icons">edit</i>
              </button>

              <button
                type="button"
                className="cf-btn cf-btn--block cf-btn--icon"
                onClick={remove(person)}
              >
                <i className="material-icons">restore_from_trash</i>
              </button>
            </td>
            <td>{person.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

PeopleListView.propTypes = {
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default PeopleListView;
