import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getState } from '../../../../auth/hooks/useAuthState';
import api from '../../../../utils/api/cashFlows';
import CashFlowsListPageView from './CashFlowsListPageView';
import useCashFlowsList from '../../../../utils/hooks/useCashFlowsList';
import getMessageFromError from '../../../../utils/helpers/getMessageFromError';


const orderList = list => list.sort((flowA, flowB) => flowB.dateTime - flowA.dateTime);

const CashFlowsListPageController = ({ match, history }) => {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [list] = useCashFlowsList();
  const goAddIncome = () => { history.push(`${match.path}/newIncome`); };
  const goAddExpense = () => { history.push(`${match.path}/newExpense`); };
  const goEdit = registry => () => { history.push(`${match.path}/edit/${registry.id}`); };
  const removeRegistry = registry => async () => {
    const { token } = getState();
    try {
      await api.delete(token, registry.id);
    } catch (error) {
      alert(getMessageFromError(error));
    }
  };
  const orderedList = orderList(list);

  return (
    <CashFlowsListPageView
      orderedList={orderedList}
      addIncome={goAddIncome}
      addExpense={goAddExpense}
      edit={goEdit}
      remove={removeRegistry}
      showAddMenu={showAddMenu}
      setShowAddMenu={setShowAddMenu}
    />
  );
};

CashFlowsListPageController.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default CashFlowsListPageController;
