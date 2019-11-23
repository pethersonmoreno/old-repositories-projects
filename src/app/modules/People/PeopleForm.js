/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button
} from 'grommet';
import peopleApi from '../../../api/people';
import { getState } from '../../hooks/useAuthState';
import { usePerson } from './hooks';
import './PeopleForm.scss';

const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = event => {
    setValue(event.target.value);
  };
  return [value, handleChange, setValue];
};


const PeopleForm = ({ match: { params: { id } }, history }) => {
  const [name, onChangeName, setName] = useInputValue('');
  usePerson(id, setName);
  const savePerson = async () => {
    const { token } = getState();
    if (id) {
      await peopleApi.replace(token, id, { name });
    } else {
      await peopleApi.add(token, { name });
    }
    history.push('/people');
  };
  return (
    <Form className="people-form">
      <input autoFocus name="name" label="Name" value={name} onChange={onChangeName} />
      <Button type="submit" label="Save" onClick={savePerson} />
    </Form>
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
