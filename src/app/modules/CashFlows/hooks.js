import { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import api from '../../../api/cashFlows';
import accountsApi from '../../../api/accounts';
import cashFlowDescriptionsApi from '../../../api/cashFlowDescriptions';
import { getState } from '../../hooks/useAuthState';
import getMessageFromError from '../../../helpers/getMessageFromError';

export const useRegistriesList = tick => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { token } = getState();
      const listLoaded = await api.getList(token, { orderBy: 'dateTime', orderByDirection: 'desc' });
      setList(listLoaded);
    };
    fetchData();
  }, [tick]);
  return list;
};
const getAccountDescription = (peopleList, account) => {
  const person = peopleList.find(p => p.id === account.personId);
  if (person) {
    return `${account.description} (${person.name})`;
  }
  return account.description;
};
export const useAccountsFullDescriptionList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { token } = getState();
      const accountsList = await accountsApi.getList(token);
      const peopleList = await cashFlowDescriptionsApi.getList(token);
      setList(accountsList.map(account => ({
        label: getAccountDescription(peopleList, account),
        value: account.id,
      })));
    };
    fetchData();
  }, []);
  return list;
};
export const useCashFlowDescriptionsList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { token } = getState();
      const listLoaded = await cashFlowDescriptionsApi.getList(token);
      setList(listLoaded);
    };
    fetchData();
  }, []);
  return list;
};

export const useRegistry = id => {
  const [loading, setLoading] = useState(true);
  const [registry, setRegistry] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }
      const { token } = getState();
      const registryLoaded = await api.get(token, id);
      setRegistry(registryLoaded);
      setLoading(false);
    };
    fetchData();
  }, [id, setRegistry]);
  return [registry, loading];
};

export const useForceUpdate = () => {
  const [tick, setTick] = useState(0);
  const forceUpdate = useCallback(() => {
    setTick(oldTick => oldTick + 1);
  }, []);
  return [tick, forceUpdate];
};

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
