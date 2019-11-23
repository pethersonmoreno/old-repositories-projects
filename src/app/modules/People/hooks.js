import { useState, useEffect } from 'react';
import peopleApi from '../../../api/people';
import { getState } from '../../hooks/useAuthState';

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
