import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDatePicker from 'react-datepicker';
import {
  Paper, Button
} from 'react-md';
import CashFlowsList from '../CashFlowsList';
import './CashFlowsListPageView.scss';

const CashFlowsListPageView = ({
  monthDate, setMonthDate,
  orderedList,
  addIncome,
  addExpense,
  edit,
  remove,
  showAddMenu, setShowAddMenu,

}) => (
  <Paper>
    <div>
      Month:
      {' '}
      <ReactDatePicker
        selected={monthDate}
        onChange={date => setMonthDate(date)}
        dateFormat="yyyy-MM"
        showMonthYearPicker
      />
    </div>
    <CashFlowsList list={orderedList} edit={edit} remove={remove} />
    <div className={classNames('fabContainer', {
      showAddMenu
    })}
    >
      <div className="addMenu">
        <Button floating primary onClick={addIncome}>add</Button>
        <Button floating secondary onClick={addExpense}>add</Button>
      </div>
      <Button floating mini onClick={() => setShowAddMenu(!showAddMenu)}>add</Button>
    </div>
  </Paper>
);

CashFlowsListPageView.propTypes = {
  monthDate: PropTypes.string.isRequired,
  setMonthDate: PropTypes.func.isRequired,
  orderedList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    inOut: PropTypes.bool.isRequired,
    dateTime: PropTypes.instanceOf(Date).isRequired,
    accountId: PropTypes.string.isRequired,
    cashFlowDescriptionId: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
  addIncome: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  showAddMenu: PropTypes.bool.isRequired,
  setShowAddMenu: PropTypes.func.isRequired,
};

export default CashFlowsListPageView;
