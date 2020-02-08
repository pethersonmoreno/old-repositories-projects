import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../../../utils/api/cashFlows';
import CashFlowsListPageView from './CashFlowsListPageView';
import useCashFlowsList from '../../../../utils/hooks/useCashFlowsList';
import useCashFlowDescriptionsList from '../../../../utils/hooks/useCashFlowDescriptionsList';
import getMessageFromError from '../../../../utils/helpers/getMessageFromError';
import { useToken } from '../../../../auth/selectors/selectorsAuth';


const orderList = list =>
  list.sort((flowA, flowB) => flowB.dateTime - flowA.dateTime);

const CashFlowsListPageController = ({ match, history }) => {
  const token = useToken();
  const [monthDate, setMonthDate] = useState(new Date());
  const [cashFlowDescriptionId, setCashFlowDescriptionId] = useState('');
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [list] = useCashFlowsList();
  const [cashFlowDescriptionsList] = useCashFlowDescriptionsList();
  const monthDateString = moment(new Date(monthDate)).format('YYYY-MM');
  let listFiltered = list
    .filter(cashFlow => moment(new Date(cashFlow.dateTime)).format('YYYY-MM') === monthDateString);
  if (cashFlowDescriptionId) {
    listFiltered = listFiltered
      .filter(cashFlow => cashFlow.cashFlowDescriptionId === cashFlowDescriptionId);
  }
  const goAddIncome = () => { history.push(`${match.path}/newIncome`); };
  const goAddExpense = () => { history.push(`${match.path}/newExpense`); };
  const goEdit = registry => () => { history.push(`${match.path}/edit/${registry.id}`); };
  const removeRegistry = registry => async () => {
    try {
      await api.delete(token, registry.id);
    } catch (error) {
      alert(getMessageFromError(error));
    }
  };
  const orderedList = orderList(listFiltered);

  return (
    <CashFlowsListPageView
      monthDate={monthDate}
      setMonthDate={setMonthDate}
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
