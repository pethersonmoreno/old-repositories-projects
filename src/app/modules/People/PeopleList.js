import React, { useState, useEffect } from 'react';
import peopleApi from '../../../api/people';
import useAuthState from '../../states/useAuthState';

const PeopleList = () => {
  const [state] = useAuthState();
  const { token } = state;
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const listLoaded = await peopleApi.getList(token);
      setList(listLoaded);
    };
    fetchData();
  }, [token]);
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
