import React from 'react';
import PropTypes from 'prop-types';
import {
  DataTable, TableHeader, TableRow, TableColumn, TableBody
} from 'react-md';

const PeopleListView = ({
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
        {list.map(person => (
          <TableRow key={person.id}>
            <TableColumn>
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
            </TableColumn>
            <TableColumn>{person.name}</TableColumn>
          </TableRow>
        ))}
      </TableBody>
    </DataTable>
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
