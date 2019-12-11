import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Button, DataTable, TableHeader, TableRow, TableColumn, TableBody
} from 'react-md';
import {
  getAccountsFulDescriptionList
} from '../hooks';
import useAccountsList from '../../../hooks/useAccountsList';
import usePeopleList from '../../../hooks/usePeopleList';
import useCashFlowDescriptionsList from '../../../hooks/useCashFlowDescriptionsList';

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


const CashFlowsListOld = ({ list, edit, remove }) => {
  const [accountsList] = useAccountsList();
  const [peopleList] = usePeopleList();
  const accountsFullList = getAccountsFulDescriptionList(accountsList, peopleList);
  const [cashFlowDescriptionsList] = useCashFlowDescriptionsList();
  return (
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
                onClick={edit(cashFlow)}
              >
                edit
              </Button>
              <Button
                icon
                onClick={remove(cashFlow)}
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
  );
};

CashFlowsListOld.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    inOut: PropTypes.bool.isRequired,
    dateTime: PropTypes.instanceOf(Date).isRequired,
    accountId: PropTypes.string.isRequired,
    cashFlowDescriptionId: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default CashFlowsListOld;
