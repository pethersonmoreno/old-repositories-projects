import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import peopleApi from '../../../api/people';

const PeopleList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = await firebase.auth().currentUser.getIdToken();
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
