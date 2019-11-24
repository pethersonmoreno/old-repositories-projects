import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Button, DataTable, TableHeader, TableRow, TableColumn, TableBody
} from 'react-md';
import { useRegistriesList, useForceUpdate } from './hooks';
import { getState } from '../../hooks/useAuthState';
import api from '../../../api/accounts';
import getMessageFromError from '../../../helpers/getMessageFromError';

const AccountsList = ({ match, history }) => {
  const [tick, forceUpdate] = useForceUpdate();
  const list = useRegistriesList(tick);
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
            <TableColumn>Description</TableColumn>
            <TableColumn>Current Value</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map(account => (
            <TableRow key={account.id}>
              <TableColumn>
                <Button
                  icon
                  onClick={goEdit(account)}
                >
                  edit
                </Button>
                <Button
                  icon
                  onClick={deleteRegistry(account)}
                >
                  restore_from_trash
                </Button>
              </TableColumn>
              <TableColumn>{account.description}</TableColumn>
              <TableColumn>{account.currentValue}</TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    </Paper>
  );
};

AccountsList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default AccountsList;
