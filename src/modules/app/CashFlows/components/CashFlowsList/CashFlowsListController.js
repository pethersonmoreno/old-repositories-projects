import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CashFlowsListView from './CashFlowsListView';

const groupByDates = list => {
  const listReady = list
    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
    .reduce((newList, cashFlow) => {
      let group = null;
      const date = new Date(cashFlow.dateTime);
      const groupId = moment(date).format('YYYY-MM-DD');
      if (newList.length) {
        const lastGroup = newList[newList.length - 1];
        if (lastGroup.id === groupId) {
          group = lastGroup;
        }
      }
      if (group === null) {
        group = { id: groupId, date, items: [] };
        newList.push(group);
      }
      group.items.push(cashFlow);
      return newList;
    }, []);
  console.log('listReady: ', listReady);
  return listReady;
};

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
    dateTime: PropTypes.string.isRequired,
    accountId: PropTypes.string.isRequired,
    cashFlowDescriptionId: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default CashFlowsListController;
