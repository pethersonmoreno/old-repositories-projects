import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import {
  List, ListItem, ListDivider
} from '@morenobr/guideline-react';
import { useCashFlowListMonth, useCashFlowsCurrentMonth } from '../../selectors/selectorsCashFlows';
import useCashFlowDescriptionsList from '../../../../utils/hooks/useCashFlowDescriptionsList';
import formatMoneyValue from '../../../../utils/helpers/formatMoneyValue';
import * as actions from '../../actions/actionsCashFlows';
import './CashFlowsReport.scss';

const listIgnoreDescriptions = [
  '5WGg1E8ES5wG8qj7obDW', // Gastos Cartão de Crédito
  'c6Agf4mYQrbPFT2YLBeg', // Pagamento Fatura
  'Iv9iIfXebD6rdmTwtYv2', // Transferência
  'GIgJXgw2MS0044HgiFlr', // Saque
];

const getCashFlowDescription = (cashFlowDescriptionsList, cashFlowDescriptionId) => {
  const cashFlowDescription = cashFlowDescriptionsList.find(
    cfd => cfd.id === cashFlowDescriptionId
  );
  if (cashFlowDescription) {
    return cashFlowDescription.name;
  }
  return '(Not found)';
};

const orderListValue = (list, isDesc) =>
  list.sort((flowA, flowB) => (flowA.value - flowB.value) * (isDesc ? -1 : 1));

const groupByDescription = list => list
  .sort((flowA, flowB) => flowB.cashFlowDescriptionId - flowA.cashFlowDescriptionId)
  .reduce((newList, cashFlow) => {
    let group = newList.find(f => f.cashFlowDescriptionId === cashFlow.cashFlowDescriptionId);
    if (!group) {
      group = { cashFlowDescriptionId: cashFlow.cashFlowDescriptionId, value: 0, items: [] };
      newList.push(group);
    }
    group.items.push(cashFlow);
    group.value += cashFlow.value * (cashFlow.inOut ? -1 : 1);
    return newList;
  }, []);

const CashFlowsReport = () => {
  const dispatch = useDispatch();
  const [cashFlowDescriptionsList] = useCashFlowDescriptionsList();
  const monthDate = useCashFlowsCurrentMonth();
  const list = useCashFlowListMonth(monthDate);
  const listFiltered = list
    .filter(cashFlow => !listIgnoreDescriptions.find(id => cashFlow.cashFlowDescriptionId === id));
  const groupedList = groupByDescription(listFiltered);
  const negativeDescriptions = orderListValue(groupedList.filter(group => group.value < 0), false);
  const positiveDescriptions = orderListValue(groupedList.filter(group => group.value >= 0), true);
  return (
    <div className="cf-paper">
      <div>
        Month:
        {' '}
        <ReactDatePicker
          selected={new Date(`${monthDate}-02`)}
          onChange={month => dispatch(actions.setCashFlowsCurrentMonth(month))}
          dateFormat="yyyy-MM"
          showMonthYearPicker
        />
      </div>
      <ListDivider />
      {negativeDescriptions.length > 0 && (
        <>
          <List nonInteractive>
            <ListItem
              text={<h2>Negative Descriptions</h2>}
            />
            {negativeDescriptions.map((group, index) => (
              <>
                {index > 0 && <ListDivider asItem />}
                <ListItem
                  key={group.cashFlowDescriptionId}
                  text={getCashFlowDescription(
                    cashFlowDescriptionsList, group.cashFlowDescriptionId
                  )}
                  contentRight={<span>{formatMoneyValue(group.value)}</span>}
                />
              </>
            ))}
          </List>
          <ListDivider />
        </>
      )}
      {positiveDescriptions.length > 0 && (
        <>
          <List nonInteractive>
            <ListItem
              text={<h2>Positive Descriptions</h2>}
            />
            {positiveDescriptions.map((group, index) => (
              <>
                {index > 0 && <ListDivider asItem />}
                <ListItem
                  key={group.cashFlowDescriptionId}
                  text={getCashFlowDescription(
                    cashFlowDescriptionsList, group.cashFlowDescriptionId
                  )}
                  contentRight={<span>{formatMoneyValue(group.value)}</span>}
                />
              </>
            ))}
          </List>
          <ListDivider />
        </>
      )}
      <List nonInteractive>
        <ListItem
          text={<h2>Total</h2>}
        />
        <ListItem
          text="Negative"
          contentRight={(
            <span>
              {formatMoneyValue(negativeDescriptions.reduce((sum, group) => sum + group.value, 0))}
            </span>
          )}
        />
        <ListDivider asItem />
        <ListItem
          text="Positive"
          contentRight={(
            <span>
              {formatMoneyValue(positiveDescriptions.reduce((sum, group) => sum + group.value, 0))}
            </span>
          )}
        />
      </List>
    </div>
  );
};

CashFlowsReport.propTypes = {

};

export default CashFlowsReport;
