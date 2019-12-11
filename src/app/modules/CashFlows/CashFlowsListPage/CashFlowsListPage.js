import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Paper, Button
} from 'react-md';
import { getState } from '../../../hooks/useAuthState';
import api from '../../../../api/cashFlows';
import getMessageFromError from '../../../../helpers/getMessageFromError';
import './CashFlowsListPage.scss';
import useCashFlowsList from '../../../hooks/useCashFlowsList';
// import CashFlowsListOld from './CashFlowsListOld';
import CashFlowsList from './CashFlowsList';


const orderList = list => list.sort((flowA, flowB) => flowB.dateTime - flowA.dateTime);

const CashFlowsListPage = ({ match, history }) => {
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
    <Paper>
      {/* <CashFlowsListOld list={orderedList} edit={goEdit} remove={removeRegistry} /> */}
      <CashFlowsList list={orderedList} edit={goEdit} remove={removeRegistry} />
      <div className={classNames('fabContainer', {
        showAddMenu
      })}
      >
        <div className="addMenu">
          <Button floating primary onClick={goAddIncome}>add</Button>
          <Button floating secondary onClick={goAddExpense}>add</Button>
        </div>
        <Button floating mini onClick={() => setShowAddMenu(!showAddMenu)}>add</Button>
      </div>
    </Paper>
  );
};

CashFlowsListPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default CashFlowsListPage;
