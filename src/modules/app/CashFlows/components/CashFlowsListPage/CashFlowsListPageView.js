import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDatePicker from 'react-datepicker';
import {
  Paper, Button
} from 'react-md';
import CashFlowsList from '../CashFlowsList';
import './CashFlowsListPageView.scss';
import AutoCompleteField from '../../../../utils/components/AutoCompleteField';

const CashFlowsListPageView = ({
  monthDate, setMonthDate,
  cashFlowDescriptionId, setCashFlowDescriptionId,
  cashFlowDescriptionsList,
  orderedList,
  addIncome,
  addExpense,
  edit,
  remove,
  showAddMenu, setShowAddMenu,

}) => (
  <Paper>
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ marginRight: 10 }}>
      Month:
        {' '}
        <ReactDatePicker
          selected={monthDate}
          onChange={date => setMonthDate(date)}
          dateFormat="yyyy-MM"
          showMonthYearPicker
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: 3 }}>
        Description:
          {' '}
        </div>
        <div>
          <AutoCompleteField
            id="cashFlowDescriptionId"
            data={cashFlowDescriptionsList}
            value={cashFlowDescriptionId}
            setValue={setCashFlowDescriptionId}
            dataLabel="name"
            dataValue="id"
            label=""
            placeholder=""
          />
        </div>
      </div>
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
  monthDate: PropTypes.instanceOf(Date).isRequired,
  setMonthDate: PropTypes.func.isRequired,
  cashFlowDescriptionId: PropTypes.string,
  setCashFlowDescriptionId: PropTypes.func.isRequired,
  cashFlowDescriptionsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  orderedList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    inOut: PropTypes.bool.isRequired,
    dateTime: PropTypes.string.isRequired,
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
CashFlowsListPageView.defaultProps = {
  cashFlowDescriptionId: null,
};

export default CashFlowsListPageView;
