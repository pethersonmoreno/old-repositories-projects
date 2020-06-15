import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, FloatingActionButton } from '@morenobr/guideline-react';

const PeopleListView = ({
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
        {list.map(person => (
          <tr key={person.id}>
            <td>
              <IconButton icon="edit" onClick={edit(person)} />
              <IconButton icon="restore_from_trash" onClick={remove(person)} />
            </td>
            <td>{person.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <FloatingActionButton icon="add" onClick={add} />
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
