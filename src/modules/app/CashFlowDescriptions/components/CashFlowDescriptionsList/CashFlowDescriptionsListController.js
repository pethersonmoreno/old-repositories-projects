import React from 'react';
import PropTypes from 'prop-types';
import { getState } from '../../../../auth/hooks/useAuthState';
import api from '../../../../utils/api/cashFlowDescriptions';
import CashFlowDescriptionsListView from './CashFlowDescriptionsListView';
import getMessageFromError from '../../../../utils/helpers/getMessageFromError';
import { useCashFlowDescriptionsList } from '../../selectors/selectorsCashFlowDescriptions';

const CashFlowDescriptionsListController = ({ match, history }) => {
  const list = useCashFlowDescriptionsList();
  const goAdd = () => { history.push(`${match.path}/new`); };
  const goEdit = registry => () => { history.push(`${match.path}/edit/${registry.id}`); };
  const deleteRegistry = registry => async () => {
    const { token } = getState();
    try {
      await api.delete(token, registry.id);
    } catch (error) {
      alert(getMessageFromError(error));
    }
  };
  return (
    <CashFlowDescriptionsListView
      add={goAdd}
      edit={goEdit}
      remove={deleteRegistry}
      list={list}
    />
  );
};

CashFlowDescriptionsListController.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default CashFlowDescriptionsListController;
