/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Paper } from 'react-md';
import DateTimePicker from 'react-datetime-picker';
import {
  useInputValue, saveRegistry, getAccountsFulDescriptionList
} from './hooks';
import './CashFlowForm.scss';
import AutoCompleteField from './AutoCompleteField';
import useCashFlowDescriptionsList from '../../hooks/useCashFlowDescriptionsList';
import usePeopleList from '../../hooks/usePeopleList';
import useAccountsList from '../../hooks/useAccountsList';

const initialValues = {
  dateTime: new Date(),
  value: 0,
  accountId: '',
  cashFlowDescriptionId: '',
};
const inOut = true; // Output/Expense
const CashFlowExpenseForm = ({ cashFlow, history }) => {
  const [dateTime, setDateTime] = useState(
    cashFlow ? new Date(cashFlow.dateTime) : initialValues.dateTime
  );
  const [value, onChangeValue] = useInputValue(
    cashFlow ? cashFlow.value : initialValues.value
  );
  const [accountId, setAccountId] = useState(
    cashFlow ? cashFlow.accountId : initialValues.accountId
  );
  const [cashFlowDescriptionId, setCashFlowDescriptionId] = useState(
    cashFlow ? cashFlow.cashFlowDescriptionId : initialValues.cashFlowDescriptionId
  );
  const [accountsList] = useAccountsList();
  const [peopleList] = usePeopleList();
  const accountsFullList = getAccountsFulDescriptionList(accountsList, peopleList);
  const [cashFlowDescriptionsList] = useCashFlowDescriptionsList();
  return (
    <Paper className="cash-flow-form">
      <h2>
        {cashFlow ? 'Edit' : 'New'}
        {' '}
        Expense
      </h2>
      <DateTimePicker
        name="dateTime"
        placeholder="Date Time"
        format="dd/MM/yyyy HH:mm"
        value={dateTime}
        onChange={setDateTime}
      />
      <AutoCompleteField
        id="accountId"
        data={accountsFullList}
        value={accountId}
        setValue={setAccountId}
        dataLabel="label"
        dataValue="value"
        label="Account"
        placeholder="Banespa, ..."
      />
      <AutoCompleteField
        id="cashFlowDescriptionId"
        data={cashFlowDescriptionsList}
        value={cashFlowDescriptionId}
        setValue={setCashFlowDescriptionId}
        dataLabel="name"
        dataValue="id"
        label="Cash Flow Description"
        placeholder="Chocolate, ..."
      />
      <br />
      <br />
      <input placeholder="Value" name="value" type="number" label="Value" value={value} onChange={onChangeValue} />
      <br />
      <br />
      <Button
        raised
        onClick={saveRegistry({
          accountId,
          inOut,
          value,
          dateTime,
          cashFlowDescriptionId,
        }, history, cashFlow)}
      >
        {cashFlow ? 'Update' : 'Create'}
      </Button>
    </Paper>
  );
};
CashFlowExpenseForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  cashFlow: PropTypes.shape({
    inOut: PropTypes.oneOf([true]),
    id: PropTypes.string.isRequired,
    dateTime: PropTypes.instanceOf(Date).isRequired,
    value: PropTypes.number.isRequired,
    accountId: PropTypes.string.isRequired,
    cashFlowDescriptionId: PropTypes.string.isRequired,
  }),
};
CashFlowExpenseForm.defaultProps = {
  cashFlow: null,
};

export default CashFlowExpenseForm;
