/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button
} from 'grommet';
import moment from 'moment';
import api from '../../../api/cashFlows';
import { getState } from '../../hooks/useAuthState';
import {
  useRegistry, usePeopleList, useCashFlowDescriptionsList, useAccountsList
} from './hooks';
import './CashFlowForm.scss';
import getMessageFromError from '../../../helpers/getMessageFromError';

const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = event => {
    setValue(event.target.value);
  };
  return [value, handleChange, setValue];
};

const getAccountDescription = (peopleList, account) => {
  const person = peopleList.find(p => p.id === account.personId);
  if (person) {
    return `${account.description} (${person.name})`;
  }
  return account.description;
};

const inOutList = [
  { id: true, description: 'Output' },
  { id: false, description: 'Input' },
];


const CashFlowForm = ({ match: { params: { id } }, history }) => {
  const [dateTime, onChangeDateTime, setDateTime] = useInputValue('');
  const [inOut, onChangeInOut, setInOut] = useInputValue('');
  const [value, onChangeValue, setValue] = useInputValue(0);
  const [accountId, onChangeAccountId, setAccountId] = useInputValue('');
  const [cashFlowDescriptionId, onChangeCashFlowDescriptionId, setCashFlowDescriptionId] = useInputValue('');
  const accountsList = useAccountsList();
  const peopleList = usePeopleList();
  const cashFlowDescriptionsList = useCashFlowDescriptionsList();
  const setRegistry = useCallback(registry => {
    setDateTime(moment(registry.dateTime).utc().format('YYYY-MM-DD\\THH:mm'));
    setAccountId(registry.accountId);
    setInOut(registry.inOut);
    setCashFlowDescriptionId(registry.cashFlowDescriptionId);
    setValue(registry.value);
  }, [setDateTime, setAccountId, setInOut, setCashFlowDescriptionId, setValue]);
  useRegistry(id, setRegistry);
  const saveRegistry = async () => {
    const { token } = getState();
    try {
      const registry = {
        accountId,
        inOut: inOut === 'true',
        value,
        dateTime,
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
    <Form className="cash-flow-form">
      <input autoFocus placeholder="Date Time" type="datetime-local" name="dateTime" label="Date Time" value={dateTime} onChange={onChangeDateTime} />
      <br />
      <br />
      <select placeholder="Account" value={accountId} onChange={onChangeAccountId}>
        <option value="">-- Account --</option>
        {accountsList.map(account => (
          <option key={account.id} value={account.id}>{getAccountDescription(peopleList, account)}</option>
        ))}
      </select>
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
      <select placeholder="Cash Flow Description" value={cashFlowDescriptionId} onChange={onChangeCashFlowDescriptionId}>
        <option value="">-- Cash Flow Description --</option>
        {cashFlowDescriptionsList.map(cashFlowDescription => (
          <option key={cashFlowDescription.id} value={cashFlowDescription.id}>{cashFlowDescription.name}</option>
        ))}
      </select>
      <br />
      <br />
      <input placeholder="Value" name="value" type="number" label="Value" value={value} onChange={onChangeValue} />
      <br />
      <br />
      <Button type="submit" label="Save" onClick={saveRegistry} />
    </Form>
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
