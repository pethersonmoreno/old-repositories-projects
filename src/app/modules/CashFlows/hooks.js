import { useState, useEffect, useCallback } from 'react';
import api from '../../../api/cashFlows';
import peopleApi from '../../../api/people';
import accountsApi from '../../../api/accounts';
import cashFlowDescriptionsApi from '../../../api/cashFlowDescriptions';
import { getState } from '../../hooks/useAuthState';

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

export const usePeopleList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { token } = getState();
      const listLoaded = await peopleApi.getList(token);
      setList(listLoaded);
    };
    fetchData();
  }, []);
  return list;
};
export const useAccountsList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { token } = getState();
      const listLoaded = await accountsApi.getList(token);
      setList(listLoaded);
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

export const useRegistry = (id, setRegistry) => {
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }
      const { token } = getState();
      const registry = await api.get(token, id);
      setRegistry(registry);
    };
    fetchData();
  }, [id, setRegistry]);
};

export const useForceUpdate = () => {
  const [tick, setTick] = useState(0);
  const forceUpdate = useCallback(() => {
    setTick(oldTick => oldTick + 1);
  }, []);
  return [tick, forceUpdate];
};
