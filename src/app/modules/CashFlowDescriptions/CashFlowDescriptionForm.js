/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Button } from 'react-md';
import api from '../../../api/cashFlowDescriptions';
import { getState } from '../../hooks/useAuthState';
import { useRegistry } from './hooks';
import './CashFlowDescriptionForm.scss';
import getMessageFromError from '../../../helpers/getMessageFromError';

const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = event => {
    setValue(event.target.value);
  };
  return [value, handleChange, setValue];
};


const CashFlowDescriptionForm = ({ match: { params: { id } }, history }) => {
  const [name, onChangeName, setName] = useInputValue('');
  useRegistry(id, setName);
  const saveRegistry = async () => {
    const { token } = getState();
    try {
      if (id) {
        await api.replace(token, id, { name });
      } else {
        await api.add(token, { name });
      }
      history.push('/cashFlowDescriptions');
    } catch (error) {
      alert(getMessageFromError(error));
    }
  };
  return (
    <Paper className="cash-flow-description-form">
      <input autoFocus name="name" label="Name" value={name} onChange={onChangeName} />
      <Button raised onClick={saveRegistry}>Save</Button>
    </Paper>
  );
};
CashFlowDescriptionForm.propTypes = {
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


export default CashFlowDescriptionForm;
