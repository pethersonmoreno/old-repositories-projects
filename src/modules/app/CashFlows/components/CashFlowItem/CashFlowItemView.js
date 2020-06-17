import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  IconButton, ListItem,
} from '@morenobr/guideline-react';
import formatMoneyValue from '../../../../utils/helpers/formatMoneyValue';
import './CashFlowItemView.scss';

const getAccountDescriptionWithFullDescription = (accountsListFullDescription, accountId) => {
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

const CashFlowItemView = ({
  className,
  cashFlow,
  cashFlowDescriptionsList,
  accountsFullList,
  edit,
  remove
}) =>
  (
    <ListItem
      className={`cashFlowItem ${className}`}
      text={(
        <>
          <span className="descriptions">
            <span className="description">
              {getCashFlowDescription(cashFlowDescriptionsList, cashFlow.cashFlowDescriptionId)}
            </span>
            <span className="account">
              {getAccountDescriptionWithFullDescription(accountsFullList, cashFlow.accountId)}
            </span>
          </span>
          <span className="valueType">
            <span className={classNames('value', { received: !cashFlow.inOut })}>
              {cashFlow.inOut ? '-' : ''}
              {formatMoneyValue(cashFlow.value)}
            </span>
            <span className="type">{cashFlow.inOut ? 'paid' : 'received'}</span>
          </span>
        </>
      )}
      onClick={edit}
      contentRight={<IconButton primary icon="delete" onClick={remove(cashFlow)} />}
    />
  );
CashFlowItemView.propTypes = {
  className: PropTypes.string,
  cashFlow: PropTypes.shape({
    id: PropTypes.string.isRequired,
    inOut: PropTypes.bool.isRequired,
    dateTime: PropTypes.string.isRequired,
    accountId: PropTypes.string.isRequired,
    cashFlowDescriptionId: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
  cashFlowDescriptionsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  accountsFullList: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};
CashFlowItemView.defaultProps = {
  className: '',
};

export default CashFlowItemView;
