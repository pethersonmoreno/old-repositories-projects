import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Button
} from 'react-md';
import {
  getAccountsFulDescriptionList
} from '../hooks';
import useAccountsList from '../../../hooks/useAccountsList';
import usePeopleList from '../../../hooks/usePeopleList';
import useCashFlowDescriptionsList from '../../../hooks/useCashFlowDescriptionsList';
import './CashFlowItem.scss';

const formatNumber = (number, numberOfDecimals, thousandSeparator, decimalSeparator) => {
  const regex = `\\d(?=(\\d{3})+${numberOfDecimals > 0 ? '\\D' : '$'})`;
  const num = number.toFixed(Math.max(0, numberOfDecimals));

  return (decimalSeparator ? num.replace('.', decimalSeparator) : num).replace(new RegExp(regex, 'g'), `$&${thousandSeparator}`);
};
const formatMoneyValue = value => formatNumber(value, 2, '.', ',');

const getAccountDescription = (accountsListFullDescription, accountId) => {
  const account = accountsListFullDescription.find(acc => acc.value === accountId);
  if (account) {
    return account.label;
  }
  return '(Not found)';
};


const getCashFlowDescription = (cashFlowDescriptionsList, cashFlowDescriptionId) => {
  const cashFlowDescription = cashFlowDescriptionsList.find(
    cfd => cfd.id === cashFlowDescriptionId
  );
  if (cashFlowDescription) {
    return cashFlowDescription.name;
  }
  return '(Not found)';
};

const runIfPressEnterOrSpace = funcToRun => event => {
  if (event.key === ' ' || event.key === 'Enter' || event.key === 'Spacebar') {
    event.preventDefault();
    funcToRun();
  }
};


const CashFlowItem = ({
  className, cashFlow, edit, remove
}) => {
  const [accountsList] = useAccountsList();
  const [peopleList] = usePeopleList();
  const accountsFullList = getAccountsFulDescriptionList(accountsList, peopleList);
  const [cashFlowDescriptionsList] = useCashFlowDescriptionsList();
  const editCashFlow = edit(cashFlow);
  return (
    <div
      className={`cashFlowItem ${className}`}
      role="button"
      tabIndex="0"
      onKeyDown={runIfPressEnterOrSpace(editCashFlow)}
      onClick={editCashFlow}
    >
      <div className="descriptions">
        <div className="description">
          {getCashFlowDescription(cashFlowDescriptionsList, cashFlow.cashFlowDescriptionId)}
        </div>
        <div className="account">
          {getAccountDescription(accountsFullList, cashFlow.accountId)}
        </div>
      </div>
      <div className="valueType">
        <div className={classNames('value', {
          received: !cashFlow.inOut
        })}
        >
          {cashFlow.inOut ? '-' : ''}
          {formatMoneyValue(cashFlow.value)}
        </div>
        <div className="type">{cashFlow.inOut ? 'paid' : 'received'}</div>
      </div>
      <div className="actions">
        <Button
          floating
          onClick={e => {
            e.stopPropagation();
            remove(cashFlow)();
          }}
        >
          restore_from_trash
        </Button>
      </div>
    </div>
  );
};

CashFlowItem.propTypes = {
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
CashFlowItem.defaultProps = {
  className: '',
};

export default CashFlowItem;
