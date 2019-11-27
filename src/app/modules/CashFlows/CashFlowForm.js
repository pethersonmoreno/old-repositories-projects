/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Paper } from 'react-md';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import api from '../../../api/cashFlows';
import { getState } from '../../hooks/useAuthState';
import {
  useRegistry, useCashFlowDescriptionsList, useAccountsFullDescriptionList, useInputValue
} from './hooks';
import './CashFlowForm.scss';
import getMessageFromError from '../../../helpers/getMessageFromError';
import AutoCompleteField from './AutoCompleteField';

const inOutList = [
  { id: true, description: 'Output' },
  { id: false, description: 'Input' },
];


const CashFlowForm = ({ match: { params: { id } }, history }) => {
  const [dateTime, setDateTime] = useState(new Date());
  const [inOut, onChangeInOut, setInOut] = useInputValue('');
  const [valueMoney, onChangeValueMoney, setValueMoney] = useInputValue(0);
  const [accountId, setAccountId] = useState('');
  const [cashFlowDescriptionId, setCashFlowDescriptionId] = useState('');
  const accountsList = useAccountsFullDescriptionList();
  const cashFlowDescriptionsList = useCashFlowDescriptionsList();
  const setRegistry = useCallback(registry => {
    setDateTime(new Date(registry.dateTime));
    setAccountId(registry.accountId);
    setInOut(registry.inOut);
    setCashFlowDescriptionId(registry.cashFlowDescriptionId);
    setValueMoney(registry.value);
  }, [setAccountId, setInOut, setCashFlowDescriptionId, setValueMoney]);
  useRegistry(id, setRegistry);
  const saveRegistry = async () => {
    const { token } = getState();
    try {
      const registry = {
        accountId,
        inOut: inOut === 'true',
        value: valueMoney,
        dateTime: moment(dateTime).toDate(),
        cashFlowDescriptionId,
      };
      if (id) {
        await api.replace(token, id, registry);
      } else {
        await api.add(token, registry);
      }
      history.push('/cashFlows');
    } catch (error) {
      alert(getMessageFromError(error));
    }
  };
  return (
    <Paper className="cash-flow-form">
      <DateTimePicker
        name="dateTime"
        placeholder="Date Time"
        format="dd/MM/yyyy HH:mm"
        value={dateTime}
        onChange={setDateTime}
      />
      <br />
      <br />
      <AutoCompleteField
        id="accountId"
        data={accountsList}
        value={accountId}
        setValue={setAccountId}
        dataLabel="label"
        dataValue="value"
        label="Account"
        placeholder="Banespa, ..."
      />
      <br />
      <br />
      <select placeholder="In / Out" value={inOut} onChange={onChangeInOut}>
        <option value="">-- In / Out --</option>
        {inOutList.map(inOutItem => (
          <option key={inOutItem.id} value={inOutItem.id}>{inOutItem.description}</option>
        ))}
      </select>
      <br />
      <br />
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
      <input placeholder="Value" name="value" type="number" label="Value" value={valueMoney} onChange={onChangeValueMoney} />
      <br />
      <br />
      <Button raised onClick={saveRegistry}>Save</Button>
    </Paper>
  );
};
CashFlowForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};


export default CashFlowForm;
