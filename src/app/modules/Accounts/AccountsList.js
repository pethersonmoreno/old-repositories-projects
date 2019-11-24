import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableHeader, TableBody, TableCell, TableRow,
  Button
} from 'grommet';
import { Edit, AddCircle, Trash } from 'grommet-icons';
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
    <div>
      <Button
        icon={<AddCircle />}
        onClick={goAdd}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              Action
            </TableCell>
            <TableCell scope="col" border="bottom">
              Description
            </TableCell>
            <TableCell scope="col" border="bottom">
              Current Value
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map(account => (
            <TableRow key={account.id}>
              <TableCell scope="row">
                <Button
                  icon={<Edit />}
                  onClick={goEdit(account)}
                />
                <Button
                  icon={<Trash />}
                  onClick={deleteRegistry(account)}
                />
              </TableCell>
              <TableCell scope="row">{account.description}</TableCell>
              <TableCell scope="row">{account.currentValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
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
