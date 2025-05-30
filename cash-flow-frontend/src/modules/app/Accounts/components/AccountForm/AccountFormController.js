/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AccountFormView from './AccountFormView';
import usePeopleList from '../../../../utils/hooks/usePeopleList';
import { getState as getAuthState } from '../../../../auth/hooks/useAuthState';
import getMessageFromError from '../../../../utils/helpers/getMessageFromError';
import api from '../../../../utils/api/accounts';
import useAccountsList from '../../../../utils/hooks/useAccountsList';
import useInputValue from '../../../../utils/hooks/useInputValue';

const AccountFormController = ({ match: { params: { id } }, history }) => {
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
    const { token } = getAuthState();
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
    <AccountFormView
      description={description}
      onChangeDescription={onChangeDescription}
      currentValue={currentValue}
      onChangeCurrentValue={onChangeCurrentValue}
      personId={personId}
      onChangePersonId={onChangePersonId}
      peopleList={peopleList}
      save={saveRegistry}
    />
  );
};
AccountFormController.propTypes = {
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


export default AccountFormController;
