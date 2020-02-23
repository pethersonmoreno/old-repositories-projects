import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDatePicker from 'react-datepicker';
import CashFlowsList from '../CashFlowsList';
import './CashFlowsListPageView.scss';
import AutoCompleteField from '../../../../utils/components/AutoCompleteField';

const CashFlowsListPageView = ({
  monthDate, setMonthDate,
  cashFlowDescriptionId, setCashFlowDescriptionId,
  cashFlowDescriptionsList,
  accountId, setAccountId,
  accountsFullList,
  orderedList,
  addIncome,
  addExpense,
  edit,
  remove,
  showAddMenu, setShowAddMenu,

}) => (
  <div className="cf-paper">
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
      <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
        <div style={{ marginRight: 3 }}>
        Description:
          {' '}
        </div>
        <div>
          <AutoCompleteField
            id="cashFlowDescriptionId"
            data={[...(cashFlowDescriptionId ? [{ id: '', name: '--- Remover Seleção ---' }] : []), ...cashFlowDescriptionsList]}
            value={cashFlowDescriptionId}
            setValue={setCashFlowDescriptionId}
            dataLabel="name"
            dataValue="id"
            label=""
            placeholder=""
          />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: 3 }}>
        Account:
          {' '}
        </div>
        <div>
          <AutoCompleteField
            id="accountId"
            data={[...(cashFlowDescriptionId ? [{ value: '', label: '--- Remover Seleção ---' }] : []), ...accountsFullList]}
            value={accountId}
            setValue={setAccountId}
            dataLabel="label"
            dataValue="value"
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
        <button type="button" className="cf-btn cf-btn--icon cf-btn--floating cf-paper cf-paper--2 cf-background--primary cf-btn--block" onClick={addIncome}><i className="material-icons">add</i></button>
        <button type="button" className="cf-btn cf-btn--icon cf-btn--floating cf-paper cf-paper--2 cf-background--secondary cf-btn--block" onClick={addExpense}><i className="material-icons">add</i></button>
      </div>
      <button type="button" className="cf-btn cf-btn--icon cf-btn--floating cf-btn--floating-mini cf-paper cf-paper--2 cf-btn--block" onClick={() => setShowAddMenu(!showAddMenu)}><i className="material-icons">add</i></button>
    </div>
  </div>
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
  accountId: PropTypes.string,
  setAccountId: PropTypes.func.isRequired,
  accountsFullList: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
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
  accountId: null,
};

export default CashFlowsListPageView;
