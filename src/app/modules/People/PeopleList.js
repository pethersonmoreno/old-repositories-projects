import React, { useState, useEffect } from 'react';
import peopleApi from '../../../api/people';
import { getState } from '../../states/useAuthState';

const PeopleList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { token } = getState();
      const listLoaded = await peopleApi.getList(token);
      setList(listLoaded);
    };
    fetchData();
  }, []);
  return (
    <div>
      <ul>
        {list.map(person => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PeopleList;
