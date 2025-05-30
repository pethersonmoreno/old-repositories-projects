import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CashFlowsListView from './CashFlowsListView';

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

const CashFlowsListController = ({ list, edit, remove }) => (
  <CashFlowsListView
    listsByDates={groupByDates(list)}
    edit={edit}
    remove={remove}
  />
);

CashFlowsListController.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    inOut: PropTypes.bool.isRequired,
    dateTime: PropTypes.instanceOf(Date).isRequired,
    accountId: PropTypes.string.isRequired,
    cashFlowDescriptionId: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default CashFlowsListController;
