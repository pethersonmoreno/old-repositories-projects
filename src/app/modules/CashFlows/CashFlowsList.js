import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Paper, Button, DataTable, TableHeader, TableRow, TableColumn, TableBody
} from 'react-md';
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
  const cashFlowDescription = cashFlowDescriptionsList.find(
    cfd => cfd.id === cashFlowDescriptionId
  );
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
    <Paper>
      <Button icon onClick={goAdd}>add_circle</Button>
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>Action</TableColumn>
            <TableColumn>Date Time</TableColumn>
            <TableColumn>Account</TableColumn>
            <TableColumn>Input / Output</TableColumn>
            <TableColumn>Description</TableColumn>
            <TableColumn>Value</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map(cashFlow => (
            <TableRow key={cashFlow.id}>
              <TableColumn>
                <Button
                  icon
                  onClick={goEdit(cashFlow)}
                >
                  edit
                </Button>
                <Button
                  icon
                  onClick={deleteRegistry(cashFlow)}
                >
                  restore_from_trash
                </Button>
              </TableColumn>
              <TableColumn>{moment(cashFlow.dateTime).format('DD/MM/YYYY HH:mm')}</TableColumn>
              <TableColumn>
                {getAccountDescription(accountsList, peopleList, cashFlow.accountId)}
              </TableColumn>
              <TableColumn>{cashFlow.inOut ? 'Output' : 'Input'}</TableColumn>
              <TableColumn>
                {getCashFlowDescription(cashFlowDescriptionsList, cashFlow.cashFlowDescriptionId)}
              </TableColumn>
              <TableColumn>{cashFlow.value}</TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    </Paper>
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
