import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableHeader, TableBody, TableCell, TableRow,
  Button
} from 'grommet';
import { Edit, AddCircle, Trash } from 'grommet-icons';
import {
  useRegistriesList, useForceUpdate, useAccountsList, usePeopleList, useCashFlowDescriptionsList
} from './hooks';
import { getState } from '../../hooks/useAuthState';
import api from '../../../api/cashFlows';
import getMessageFromError from '../../../helpers/getMessageFromError';

const getAccountDescription = (accountsList, peopleList, accountId) => {
  const account = accountsList.find(acc => acc.id === accountId);
  if (account) {
    const person = peopleList.find(p => p.id === account.personId);
    if (person) {
      return `${account.description} (${person.name})`;
    }
    return account.description;
  }
  return '(Not found)';
};


const getCashFlowDescription = (cashFlowDescriptionsList, cashFlowDescriptionId) => {
  const cashFlowDescription = cashFlowDescriptionsList.find(cfd => cfd.id === cashFlowDescriptionId);
  if (cashFlowDescription) {
    return cashFlowDescription.name;
  }
  return '(Not found)';
};

const CashFlowsList = ({ match, history }) => {
  const [tick, forceUpdate] = useForceUpdate();
  const list = useRegistriesList(tick);
  const accountsList = useAccountsList();
  const peopleList = usePeopleList();
  const cashFlowDescriptionsList = useCashFlowDescriptionsList();

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
              Date Time
            </TableCell>
            <TableCell scope="col" border="bottom">
              Account
            </TableCell>
            <TableCell scope="col" border="bottom">
              Input / Output
            </TableCell>
            <TableCell scope="col" border="bottom">
              Description
            </TableCell>
            <TableCell scope="col" border="bottom">
              Value
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map(cashFlow => (
            <TableRow key={cashFlow.id}>
              <TableCell scope="row">
                <Button
                  icon={<Edit />}
                  onClick={goEdit(cashFlow)}
                />
                <Button
                  icon={<Trash />}
                  onClick={deleteRegistry(cashFlow)}
                />
              </TableCell>
              <TableCell scope="row">{cashFlow.dateTime}</TableCell>
              <TableCell scope="row">{getAccountDescription(accountsList, peopleList, cashFlow.accountId)}</TableCell>
              <TableCell scope="row">{cashFlow.inOut ? 'Output' : 'Input'}</TableCell>
              <TableCell scope="row">{getCashFlowDescription(cashFlowDescriptionsList, cashFlow.cashFlowDescriptionId)}</TableCell>
              <TableCell scope="row">{cashFlow.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

CashFlowsList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default CashFlowsList;
