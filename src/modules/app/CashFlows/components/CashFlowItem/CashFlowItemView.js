import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconButton } from '@morenobr/guideline-react';
import runIfPressEnterOrSpace from '../../../../utils/helpers/runIfPressEnterOrSpace';
import formatMoneyValue from '../../../../utils/helpers/formatMoneyValue';
import './CashFlowItemView.scss';
import PointerPressable from '../../../../../futureExternalModules/components/PointerPressable';

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
}) => {
  const showMenuItem = () => document.querySelector(`#menu-button-${cashFlow.id} > button`).click();
  return (
    <div
      className={`cashFlowItem ${className}`}
      role="button"
      tabIndex="0"
      onKeyDown={runIfPressEnterOrSpace(edit)}
    >
      <div
        className="actions"
        role="button"
        tabIndex="0"
        onKeyDown={runIfPressEnterOrSpace(showMenuItem)}
        onClick={showMenuItem}
      >
        <IconButton
          icon="delete"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            remove(cashFlow)();
          }}
        />
        {/* <MenuButton
          id={`menu-button-${cashFlow.id}`}
          icon
          menuItems={[
            <ListItem
              key={1}
              leftIcon={<FontIcon>restore_from_trash</FontIcon>}
              primaryText="Remove"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                remove(cashFlow)();
              }}
            />,
          ]}
          position={MenuButton.Positions.TOP_LEFT}
          anchor={{
            x: MenuButton.HorizontalAnchors.INNER_LEFT,
            y: MenuButton.VerticalAnchors.CENTER,
          }}
          onClick={e => e.preventDefault()}
          onKeyDown={e => e.stopPropagation()}
        >
            more_vert
        </MenuButton> */}
      </div>

      <PointerPressable
        onShortPress={edit}
        onLongPress={showMenuItem}
      >
        <div className="descriptions">
          <div className="description">
            {getCashFlowDescription(cashFlowDescriptionsList, cashFlow.cashFlowDescriptionId)}
          </div>
          <div className="account">
            {getAccountDescriptionWithFullDescription(accountsFullList, cashFlow.accountId)}
          </div>
        </div>
      </PointerPressable>
      <PointerPressable
        onShortPress={edit}
        onLongPress={showMenuItem}
      >
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
      </PointerPressable>
    </div>
  );
};

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
