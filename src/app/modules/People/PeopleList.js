import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import peopleApi from '../../../api/people';
import withAppStateActions from '../../hoc/withAppStateActions';

const PeopleList = ({ token }) => {
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

PeopleList.propTypes = {
  token: PropTypes.string.isRequired,
};

export default withAppStateActions(PeopleList);
