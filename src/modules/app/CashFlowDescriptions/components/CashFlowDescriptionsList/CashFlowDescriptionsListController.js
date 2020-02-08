import React from 'react';
import PropTypes from 'prop-types';
import api from '../../../../utils/api/cashFlowDescriptions';
import CashFlowDescriptionsListView from './CashFlowDescriptionsListView';
import getMessageFromError from '../../../../utils/helpers/getMessageFromError';
import { useCashFlowDescriptionsList } from '../../selectors/selectorsCashFlowDescriptions';
import { useToken } from '../../../../auth/selectors/selectorsAuth';

const CashFlowDescriptionsListController = ({ match, history }) => {
  const token = useToken();
  const list = useCashFlowDescriptionsList();
  const goAdd = () => { history.push(`${match.path}/new`); };
  const goEdit = registry => () => { history.push(`${match.path}/edit/${registry.id}`); };
  const deleteRegistry = registry => async () => {
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
