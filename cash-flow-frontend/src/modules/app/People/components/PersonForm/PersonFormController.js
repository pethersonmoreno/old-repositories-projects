/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../../utils/api/people';
import { getState } from '../../../../auth/hooks/useAuthState';
import PersonFormView from './PersonFormView';
import usePeopleList from '../../../../utils/hooks/usePeopleList';
import getMessageFromError from '../../../../utils/helpers/getMessageFromError';
import useInputValue from '../../../../utils/hooks/useInputValue';


const PersonFormController = ({ match: { params: { id } }, history }) => {
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
    <PersonFormView
      name={name}
      onChangeName={onChangeName}
      save={saveRegistry}
    />
  );
};
PersonFormController.propTypes = {
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


export default PersonFormController;
