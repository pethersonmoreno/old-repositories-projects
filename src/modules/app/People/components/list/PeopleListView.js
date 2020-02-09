import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, DataTable, TableHeader, TableRow, TableColumn, TableBody
} from 'react-md';

const PeopleListView = ({
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
        {list.map(person => (
          <TableRow key={person.id}>
            <TableColumn>
              <Button
                icon
                onClick={edit(person)}
              >
                edit
              </Button>
              <Button
                icon
                onClick={remove(person)}
              >
                restore_from_trash
              </Button>
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
