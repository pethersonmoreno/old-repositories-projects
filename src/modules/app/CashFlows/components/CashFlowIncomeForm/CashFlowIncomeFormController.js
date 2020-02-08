/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getAccountsFulDescriptionList from '../../helpers/getAccountsFulDescriptionList';
import useSaveCashFlow from '../../hooks/useSaveCashFlow';
import useInputValue from '../../../../utils/hooks/useInputValue';
import useAccountsList from '../../../../utils/hooks/useAccountsList';
import usePeopleList from '../../../../utils/hooks/usePeopleList';
import useCashFlowDescriptionsList from '../../../../utils/hooks/useCashFlowDescriptionsList';
import CashFlowIncomeFormView from './CashFlowIncomeFormView';

const initialValues = {
  dateTime: new Date(),
  value: 0,
  accountId: '',
  cashFlowDescriptionId: '',
};
const CashFlowIncomeFormController = ({ cashFlow, history }) => {
  const saveCashFlow = useSaveCashFlow();
  const [dateTime, setDateTime] = useState(
    cashFlow ? new Date(cashFlow.dateTime) : initialValues.dateTime
  );
  const [value, onChangeValue] = useInputValue(
    cashFlow ? cashFlow.value : initialValues.value
  );
  const [accountId, setAccountId] = useState(
    cashFlow ? cashFlow.accountId : initialValues.accountId
  );
  const [cashFlowDescriptionId, setCashFlowDescriptionId] = useState(
    cashFlow ? cashFlow.cashFlowDescriptionId : initialValues.cashFlowDescriptionId
  );
  const [accountsList] = useAccountsList();
  const [peopleList] = usePeopleList();
  const accountsFullList = getAccountsFulDescriptionList(accountsList, peopleList);
  const [cashFlowDescriptionsList] = useCashFlowDescriptionsList();
  return (
    <CashFlowIncomeFormView
      edit={!!cashFlow}
      dateTime={dateTime}
      setDateTime={setDateTime}
      accountId={accountId}
      setAccountId={setAccountId}
      accountsFullList={accountsFullList}
      cashFlowDescriptionId={cashFlowDescriptionId}
      setCashFlowDescriptionId={setCashFlowDescriptionId}
      cashFlowDescriptionsList={cashFlowDescriptionsList}
      value={value}
      onChangeValue={onChangeValue}
      save={cashFlowUpdated => saveCashFlow(cashFlowUpdated, history, cashFlow)}
    />
  );
};
CashFlowIncomeFormController.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  cashFlow: PropTypes.shape({
    inOut: PropTypes.oneOf([false]),
    id: PropTypes.string.isRequired,
    dateTime: PropTypes.instanceOf(Date).isRequired,
    value: PropTypes.number.isRequired,
    accountId: PropTypes.string.isRequired,
    cashFlowDescriptionId: PropTypes.string.isRequired,
  }),
};
CashFlowIncomeFormController.defaultProps = {
  cashFlow: null,
};

export default CashFlowIncomeFormController;
