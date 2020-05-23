/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import api from '../../../../utils/api/cashFlowDescriptions';
import CashFlowDescriptionFormView from './CashFlowDescriptionFormView';
import getMessageFromError from '../../../../utils/helpers/getMessageFromError';
import useInputValue from '../../../../utils/hooks/useInputValue';
import { useCashFlowDescription } from '../../selectors/selectorsCashFlowDescriptions';
import { useToken } from '../../../../auth/selectors/selectorsAuth';
import * as actions from '../../actions/actionsCashFlowDescriptions';

const CashFlowDescriptionFormController = ({ match: { params: { id } }, history }) => {
  const dispatch = useDispatch();
  const token = useToken();
  const [name, onChangeName, setName] = useInputValue('');
  const registry = useCashFlowDescription(id);
  useEffect(() => {
    if (registry) {
      setName(registry.name);
    }
  }, [registry, setName]);
  const saveRegistry = async () => {
    try {
      const descriptionDto = { id, name };
      if (id) {
        await api.replace(token, id, { name });
        dispatch(actions.updateDescription(descriptionDto));
      } else {
        const { id: newId } = await api.add(token, { name });
        descriptionDto.id = newId;
        dispatch(actions.addDescription(descriptionDto));
      }
      history.push('/cashFlowDescriptions');
    } catch (error) {
      // eslint-disable-next-line no-alert
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
