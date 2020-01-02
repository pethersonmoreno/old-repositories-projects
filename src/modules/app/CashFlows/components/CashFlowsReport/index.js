import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import useCashFlowsList from '../../../../utils/hooks/useCashFlowsList';
import CashFlowsListView from './CashFlowsListView';

const orderList = list => list.sort((flowA, flowB) => flowB.dateTime - flowA.dateTime);

const groupByDates = list => list.reduce((newList, cashFlow) => {
  let group = null;
  if (newList.length) {
    const lastGroup = newList[newList.length - 1];
    if (moment(lastGroup.date).format('YYYY-MM-DD') === moment(cashFlow.dateTime).format('YYYY-MM-DD')) {
      group = lastGroup;
    }
  }
  if (group === null) {
    group = { date: cashFlow.dateTime, items: [] };
    newList.push(group);
  }
  group.items.push(cashFlow);
  return newList;
}, []);

const CashFlowsReport = () =>  {
  const [list] = useCashFlowsList();
  const orderedList = orderList(list);
  const grouped = groupByDates(orderedList);
  return (
    <div>
    </div>
  );
};

CashFlowsReport.propTypes = {

};

export default CashFlowsReport;
