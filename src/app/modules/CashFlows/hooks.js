import { useState } from 'react';
import moment from 'moment';
import api from '../../../api/cashFlows';
import { getState } from '../../hooks/useAuthState';
import getMessageFromError from '../../../helpers/getMessageFromError';

const getAccountDescription = (peopleList, account) => {
  const person = peopleList.find(p => p.id === account.personId);
  if (person) {
    return `${account.description} (${person.name})`;
  }
  return account.description;
};
export const getAccountsFulDescriptionList = (
  accountsList, peopleList
) => accountsList.map(account => ({
  label: getAccountDescription(peopleList, account),
  value: account.id,
}));

export const useInputValue = (initialValue, withEventTarget = true) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = eventValue => {
    const newValue = (withEventTarget ? eventValue.target.value : eventValue);
    setValue(newValue);
  };
  return [value, handleChange, setValue];
};

export const saveRegistry = ({
  accountId,
  inOut,
  value,
  dateTime,
  cashFlowDescriptionId,
}, history, oldRegistry) => async () => {
  const { token } = getState();
  try {
    const registry = {
      accountId,
      inOut,
      value,
      dateTime: moment(dateTime).toDate(),
      cashFlowDescriptionId,
    };
    if (oldRegistry) {
      await api.replace(token, oldRegistry.id, registry);
    } else {
      await api.add(token, registry);
    }
    history.push('/cashFlows');
  } catch (error) {
    alert(getMessageFromError(error));
  }
};
