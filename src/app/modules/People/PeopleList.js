import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, DataTable, TableHeader, TableRow, TableColumn, TableBody, Paper
} from 'react-md';
import { useRegistriesList, useForceUpdate } from './hooks';
import usePeopleList from './usePeopleList';
import { getState } from '../../hooks/useAuthState';
import api from '../../../api/people';
import getMessageFromError from '../../../helpers/getMessageFromError';

const PeopleList = ({ match, history }) => {
  const [tick, forceUpdate] = useForceUpdate();
  const list = usePeopleList();
  const goAdd = () => { history.push(`${match.path}/new`); };
  const goEdit = registry => () => { history.push(`${match.path}/edit/${registry.id}`); };
  const deleteRegistry = registry => async () => {
    const { token } = getState();
    try {
      await api.delete(token, registry.id);
      forceUpdate();
    } catch (error) {
      alert(getMessageFromError(error));
    }
  };
  return (
    <Paper>
      <Button icon onClick={goAdd}>add_circle</Button>
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
                  onClick={goEdit(person)}
                >
                edit
                </Button>
                <Button
                  icon
                  onClick={deleteRegistry(person)}
                >
                restore_from_trash
                </Button>
              </TableColumn>
              <TableColumn>{person.name}</TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    </Paper>
  );
};

PeopleList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default PeopleList;
