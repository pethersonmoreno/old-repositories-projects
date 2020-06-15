/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@morenobr/guideline-react';
import SelectField from '../../../../utils/components/SelectField';
import DateTimePicker from '../../../../utils/components/DateTimePicker';
import './CashFlowExpenseFormView.scss';

const inOut = true; // Output/Expense
const CashFlowExpenseFormView = ({
  edit,
  dateTime, setDateTime,
  accountId, setAccountId, accountsFullList,
  cashFlowDescriptionId, setCashFlowDescriptionId, cashFlowDescriptionsList,
  value, onChangeValue,
  save,
}) => (
  <div className="cf-paper cash-flow-form">
    <h2>
      {edit ? 'Edit' : 'New'}
      {' '}
        Expense
    </h2>
    <DateTimePicker
      name="dateTime"
      placeholder="Date Time"
      selected={dateTime}
      onChange={setDateTime}
    />
    <SelectField
      id="accountId"
      data={accountsFullList}
      value={accountId}
      setValue={setAccountId}
      dataLabel="label"
      dataValue="value"
      label="Account"
      placeholder="Banespa, ..."
    />
    <SelectField
      id="cashFlowDescriptionId"
      data={cashFlowDescriptionsList}
      value={cashFlowDescriptionId}
      setValue={setCashFlowDescriptionId}
      dataLabel="name"
      dataValue="id"
      label="Cash Flow Description"
      placeholder="Chocolate, ..."
    />
    <br />
    <br />
    <input placeholder="Value" name="value" type="number" label="Value" value={value} onChange={onChangeValue} />
    <br />
    <br />
    <Button
      raised
      label={edit ? 'Update' : 'Create'}
      onClick={save({
        accountId,
        inOut,
        value,
        dateTime,
        cashFlowDescriptionId,
      })}
    />
  </div>
);
CashFlowExpenseFormView.propTypes = {
  edit: PropTypes.bool.isRequired,
  dateTime: PropTypes.instanceOf(Date).isRequired,
  setDateTime: PropTypes.func.isRequired,
  accountId: PropTypes.string.isRequired,
  setAccountId: PropTypes.func.isRequired,
  accountsFullList: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  cashFlowDescriptionId: PropTypes.string.isRequired,
  setCashFlowDescriptionId: PropTypes.func.isRequired,
  cashFlowDescriptionsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.number.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};

export default CashFlowExpenseFormView;
