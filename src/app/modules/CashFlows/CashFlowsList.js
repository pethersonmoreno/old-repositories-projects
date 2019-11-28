import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import {
  Paper, Button, DataTable, TableHeader, TableRow, TableColumn, TableBody
} from 'react-md';
import {
  getAccountsFulDescriptionList
} from './hooks';
import { getState } from '../../hooks/useAuthState';
import api from '../../../api/cashFlows';
import getMessageFromError from '../../../helpers/getMessageFromError';
import './CashFlowsList.scss';
import useCashFlowsList from '../../hooks/useCashFlowsList';
import useAccountsList from '../../hooks/useAccountsList';
import usePeopleList from '../../hooks/usePeopleList';
import useCashFlowDescriptionsList from '../../hooks/useCashFlowDescriptionsList';

const getAccountDescription = (accountsListFullDescription, accountId) => {
  const account = accountsListFullDescription.find(acc => acc.value === accountId);
  if (account) {
    return account.label;
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
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [list] = useCashFlowsList();
  const [accountsList] = useAccountsList();
  const [peopleList] = usePeopleList();
  const accountsFullList = getAccountsFulDescriptionList(accountsList, peopleList);
  const [cashFlowDescriptionsList] = useCashFlowDescriptionsList();
  const goAddIncome = () => { history.push(`${match.path}/newIncome`); };
  const goAddExpense = () => { history.push(`${match.path}/newExpense`); };
  const goEdit = registry => () => { history.push(`${match.path}/edit/${registry.id}`); };
  const deleteRegistry = registry => async () => {
    const { token } = getState();
    try {
      await api.delete(token, registry.id);
    } catch (error) {
      alert(getMessageFromError(error));
    }
  };

  return (
    <Paper>
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
                {getAccountDescription(accountsFullList, cashFlow.accountId)}
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

      <div className={classNames('fabContainer', {
        showAddMenu
      })}
      >
        <div className="addMenu">
          <Button floating primary onClick={goAddIncome}>add</Button>
          <Button floating secondary onClick={goAddExpense}>add</Button>
        </div>
        <Button floating mini onClick={() => setShowAddMenu(!showAddMenu)}>add</Button>
      </div>
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
