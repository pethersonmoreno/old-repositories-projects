import { useState, useEffect, useCallback } from 'react';
import peopleApi from '../../../api/people';
import { getState } from '../../hooks/useAuthState';

export const usePeopleList = tick => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { token } = getState();
      const listLoaded = await peopleApi.getList(token, { orderBy: 'name', orderByDirection: 'asc' });
      setList(listLoaded);
    };
    fetchData();
  }, [tick]);
  return list;
};

export const usePerson = (id, setName) => {
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }
      const { token } = getState();
      const person = await peopleApi.get(token, id);
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
