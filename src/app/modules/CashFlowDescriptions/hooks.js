import { useState, useEffect, useCallback } from 'react';
import cashFlowDescriptionsApi from '../../../api/cashFlowDescriptions';
import { getState } from '../../hooks/useAuthState';

export const useRegistriesList = tick => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { token } = getState();
      const listLoaded = await cashFlowDescriptionsApi.getList(token, { orderBy: 'name', orderByDirection: 'asc' });
      setList(listLoaded);
    };
    fetchData();
  }, [tick]);
  return list;
};

export const useRegistry = (id, setName) => {
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }
      const { token } = getState();
      const person = await cashFlowDescriptionsApi.get(token, id);
      setName(person.name);
    };
    fetchData();
  }, [id, setName]);
};

export const useForceUpdate = () => {
  const [tick, setTick] = useState(0);
  const forceUpdate = useCallback(() => {
    setTick(oldTick => oldTick + 1);
  }, []);
  return [tick, forceUpdate];
};
