/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../../utils/api/cashFlowDescriptions';
import { getState } from '../../../../auth/hooks/useAuthState';
import CashFlowDescriptionFormView from './CashFlowDescriptionFormView';
import useCashFlowDescriptionsList from '../../../../utils/hooks/useCashFlowDescriptionsList';
import getMessageFromError from '../../../../utils/helpers/getMessageFromError';
import useInputValue from '../../../../utils/hooks/useInputValue';

const CashFlowDescriptionFormController = ({ match: { params: { id } }, history }) => {
  const [name, onChangeName, setName] = useInputValue('');
  const [list] = useCashFlowDescriptionsList();
  useEffect(() => {
    const registry = list.find(p => p.id === id);
    if (registry) {
      setName(registry.name);
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
      history.push('/cashFlowDescriptions');
    } catch (error) {
      alert(getMessageFromError(error));
    }
  };
  return (
    <CashFlowDescriptionFormView
      name={name}
      onChangeName={onChangeName}
      save={saveRegistry}
    />
  );
};
CashFlowDescriptionFormController.propTypes = {
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


export default CashFlowDescriptionFormController;
