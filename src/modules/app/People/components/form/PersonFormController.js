/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import api from '../../../../utils/api/people';
import PersonFormView from './PersonFormView';
import getMessageFromError from '../../../../utils/helpers/getMessageFromError';
import useInputValue from '../../../../utils/hooks/useInputValue';
import { usePerson } from '../../selectors/selectorsPeople';
import { useToken } from '../../../../auth/selectors/selectorsAuth';
import * as actions from '../../actions/actionsPeople';


const PersonFormController = ({ match: { params: { id } }, history }) => {
  const dispatch = useDispatch();
  const token = useToken();
  const [name, onChangeName, setName] = useInputValue('');
  const person = usePerson(id);
  useEffect(() => {
    if (person) {
      setName(person.name);
    }
  }, [person, setName]);
  const saveRegistry = async () => {
    try {
      const personDto = { id, name };
      if (id) {
        await api.replace(token, id, { name });
        dispatch(actions.updatePerson(personDto));
      } else {
        await api.add(token, { name });
        dispatch(actions.addPerson(personDto));
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
