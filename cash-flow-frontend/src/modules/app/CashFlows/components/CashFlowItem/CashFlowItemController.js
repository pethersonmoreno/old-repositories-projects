import React from 'react';
import PropTypes from 'prop-types';
import useAccountsList from '../../../../utils/hooks/useAccountsList';
import usePeopleList from '../../../../utils/hooks/usePeopleList';
import useCashFlowDescriptionsList from '../../../../utils/hooks/useCashFlowDescriptionsList';
import getAccountsFulDescriptionList from '../../helpers/getAccountsFulDescriptionList';
import CashFlowItemView from './CashFlowItemView';

const CashFlowItemController = ({
  className, cashFlow, edit, remove
}) => {
  const [accountsList] = useAccountsList();
  const [peopleList] = usePeopleList();
  const accountsFullList = getAccountsFulDescriptionList(accountsList, peopleList);
  const [cashFlowDescriptionsList] = useCashFlowDescriptionsList();
  const editCashFlow = edit(cashFlow);
  return (
    <CashFlowItemView

      className={className}
      cashFlow={cashFlow}
      cashFlowDescriptionsList={cashFlowDescriptionsList}
      accountsFullList={accountsFullList}
      edit={editCashFlow}
      remove={remove}
    />
  );
};

CashFlowItemController.propTypes = {
  className: PropTypes.string,
  cashFlow: PropTypes.shape({
    id: PropTypes.string.isRequired,
    inOut: PropTypes.bool.isRequired,
    dateTime: PropTypes.instanceOf(Date).isRequired,
    accountId: PropTypes.string.isRequired,
    cashFlowDescriptionId: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};
CashFlowItemController.defaultProps = {
  className: '',
};

export default CashFlowItemController;
