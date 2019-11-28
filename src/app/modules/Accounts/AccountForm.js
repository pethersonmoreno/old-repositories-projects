/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Paper, Button } from 'react-md';
import api from '../../../api/accounts';
import { getState } from '../../hooks/useAuthState';
import './AccountForm.scss';
import getMessageFromError from '../../../helpers/getMessageFromError';
import useAccountsList from '../../hooks/useAccountsList';
import usePeopleList from '../../hooks/usePeopleList';

const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = event => {
    setValue(event.target.value);
  };
  return [value, handleChange, setValue];
};


const AccountForm = ({ match: { params: { id } }, history }) => {
  const [description, onChangeDescription, setDescription] = useInputValue('');
  const [currentValue, onChangeCurrentValue, setCurrentValue] = useInputValue(0);
  const [personId, onChangePersonId, setPersonId] = useInputValue('');
  const [peopleList] = usePeopleList();
  const [list] = useAccountsList();
  useEffect(() => {
    const registry = list.find(p => p.id === id);
    if (registry) {
      setDescription(registry.description);
      setCurrentValue(registry.currentValue);
      setPersonId(registry.personId);
    }
  }, [id, list, setCurrentValue, setDescription, setPersonId]);
  const saveRegistry = async () => {
    const { token } = getState();
    try {
      const registry = {
        personId,
        description,
        currentValue,
      };
      if (id) {
        await api.replace(token, id, registry);
      } else {
        await api.add(token, registry);
      }
      history.push('/accounts');
    } catch (error) {
      alert(getMessageFromError(error));
    }
  };
  return (
    <Paper className="account-form">
      <input autoFocus placeholder="Description" name="description" label="Description" value={description} onChange={onChangeDescription} />
      <br />
      <br />
      <input placeholder="Current Value" name="currentValue" type="number" label="Current Value" value={currentValue} onChange={onChangeCurrentValue} />
      <br />
      <br />
      <select placeholder="Person" value={personId} onChange={onChangePersonId}>
        <option value=""> </option>
        {peopleList.map(person => (
          <option key={person.id} value={person.id}>{person.name}</option>
        ))}
      </select>
      <br />
      <br />
      <Button raised onClick={saveRegistry}>Save</Button>
    </Paper>
  );
};
AccountForm.propTypes = {
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


export default AccountForm;
