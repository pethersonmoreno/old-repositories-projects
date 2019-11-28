/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Paper } from 'react-md';
import api from '../../../api/people';
import { getState } from '../../hooks/useAuthState';
import './PeopleForm.scss';
import getMessageFromError from '../../../helpers/getMessageFromError';
import usePeopleList from '../../hooks/usePeopleList';

const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = event => {
    setValue(event.target.value);
  };
  return [value, handleChange, setValue];
};


const PeopleForm = ({ match: { params: { id } }, history }) => {
  const [name, onChangeName, setName] = useInputValue('');
  const [list] = usePeopleList();
  useEffect(() => {
    const person = list.find(p => p.id === id);
    if (person) {
      setName(person.name);
    }
  }, [id, list, setName]);
  const saveRegistry = async () => {
    const { token } = getState();
    try {
      if (id) {
        await api.replace(token, id, { name });
      } else {
        await api.add(token, { name });
      }
      history.push('/people');
    } catch (error) {
      alert(getMessageFromError(error));
    }
  };
  return (
    <Paper className="people-form">
      <input autoFocus name="name" label="Name" value={name} onChange={onChangeName} />
      <Button raised onClick={saveRegistry}>Save</Button>
    </Paper>
  );
};
PeopleForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};


export default PeopleForm;
