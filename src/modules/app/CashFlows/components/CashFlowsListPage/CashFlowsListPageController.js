import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import api from '../../../../utils/api/cashFlows';
import CashFlowsListPageView from './CashFlowsListPageView';
import { useCashFlowListMonth, useCashFlowsCurrentMonth } from '../../selectors/selectorsCashFlows';
import useCashFlowDescriptionsList from '../../../../utils/hooks/useCashFlowDescriptionsList';
import getMessageFromError from '../../../../utils/helpers/getMessageFromError';
import { useToken } from '../../../../auth/selectors/selectorsAuth';
import * as actions from '../../actions/actionsCashFlows';


const orderList = list =>
  list.sort((flowA, flowB) => flowB.dateTime - flowA.dateTime);

const CashFlowsListPageController = ({ match, history }) => {
  const dispatch = useDispatch();
  const token = useToken();
  const monthDate = useCashFlowsCurrentMonth();
  const [cashFlowDescriptionId, setCashFlowDescriptionId] = useState('');
  const [showAddMenu, setShowAddMenu] = useState(false);
  const list = useCashFlowListMonth(monthDate);
  const [cashFlowDescriptionsList] = useCashFlowDescriptionsList();
  let listFiltered = list;
  if (cashFlowDescriptionId) {
    listFiltered = list
      .filter(cashFlow => cashFlow.cashFlowDescriptionId === cashFlowDescriptionId);
  }
  const goAddIncome = () => { history.push(`${match.path}/newIncome`); };
  const goAddExpense = () => { history.push(`${match.path}/newExpense`); };
  const goEdit = registry => () => { history.push(`${match.path}/edit/${registry.id}`); };
  const removeRegistry = registry => async () => {
    try {
      await api.delete(token, registry.id);
      dispatch(actions.removeCashFlow(registry.id));
    } catch (error) {
      alert(getMessageFromError(error));
    }
  };
  const orderedList = orderList(listFiltered);

  return (
    <CashFlowsListPageView
      monthDate={new Date(`${monthDate}-02`)}
      setMonthDate={month => dispatch(actions.setCashFlowsCurrentMonth(month))}
      cashFlowDescriptionId={cashFlowDescriptionId}
      setCashFlowDescriptionId={setCashFlowDescriptionId}
      cashFlowDescriptionsList={cashFlowDescriptionsList}
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
