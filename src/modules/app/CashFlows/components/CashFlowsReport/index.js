import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import {
  Paper, DataTable, TableHeader, TableRow, TableColumn, TableBody
} from 'react-md';
import useCashFlowsList from '../../../../utils/hooks/useCashFlowsList';
import useCashFlowDescriptionsList from '../../../../utils/hooks/useCashFlowDescriptionsList';
import formatMoneyValue from '../../../../utils/helpers/formatMoneyValue';
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
  const [monthDate, setMonthDate] = useState(new Date());
  const [cashFlowDescriptionsList] = useCashFlowDescriptionsList();
  const [list] = useCashFlowsList();
  const monthDateString = moment(new Date(monthDate)).format('YYYY-MM');
  const listFiltered = list
    .filter(cashFlow => !listIgnoreDescriptions.find(id => cashFlow.cashFlowDescriptionId === id))
    .filter(cashFlow => moment(new Date(cashFlow.dateTime)).format('YYYY-MM') === monthDateString);
  const groupedList = groupByDescription(listFiltered);
  const negativeDescriptions = orderListValue(groupedList.filter(group => group.value < 0), false);
  const positiveDescriptions = orderListValue(groupedList.filter(group => group.value >= 0), true);
  return (
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
      <h2>Negative Descriptions</h2>
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>Description</TableColumn>
            <TableColumn>Value</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {negativeDescriptions.map(group => (
            <TableRow key={group.cashFlowDescriptionId}>
              <TableColumn>
                {getCashFlowDescription(cashFlowDescriptionsList, group.cashFlowDescriptionId)}
              </TableColumn>
              <TableColumn>{formatMoneyValue(group.value)}</TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
      <h2>Positive Descriptions</h2>
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>Description</TableColumn>
            <TableColumn>Value</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positiveDescriptions.map(group => (
            <TableRow key={group.cashFlowDescriptionId}>
              <TableColumn>
                {getCashFlowDescription(cashFlowDescriptionsList, group.cashFlowDescriptionId)}
              </TableColumn>
              <TableColumn>{formatMoneyValue(group.value)}</TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
      <h2>Total</h2>
      <DataTable plain>
        <TableBody>
          <TableRow>
            <TableColumn>Negative</TableColumn>
            <TableColumn>
              {formatMoneyValue(negativeDescriptions.reduce((sum, group) => sum + group.value, 0))}
            </TableColumn>
          </TableRow>
          <TableRow>
            <TableColumn>Positive</TableColumn>
            <TableColumn>
              {formatMoneyValue(positiveDescriptions.reduce((sum, group) => sum + group.value, 0))}
            </TableColumn>
          </TableRow>
        </TableBody>
      </DataTable>
    </Paper>
  );
};

CashFlowsReport.propTypes = {

};

export default CashFlowsReport;
