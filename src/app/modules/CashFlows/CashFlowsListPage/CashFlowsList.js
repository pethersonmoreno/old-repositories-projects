import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './CashFlowsList.scss';
import CashFlowItem from './CashFlowItem';

const groupByDates = list => list.reduce((newList, cashFlow) => {
  let group = null;
  if (newList.length) {
    const lastGroup = newList[newList.length - 1];
    if (lastGroup.date.format('YYYY-MM-DD') === moment(cashFlow.dateTime).format('YYYY-MM-DD')) {
      group = lastGroup;
    }
  }
  if (group === null) {
    group = { date: moment(cashFlow.dateTime), items: [] };
    newList.push(group);
  }
  group.items.push(cashFlow);
  return newList;
}, []);

const CashFlowsList = ({ list, edit, remove }) => {
  const listsByDates = groupByDates(list);
  return (
    <div className="cashFlowsList">
      {listsByDates.map(group => (
        <div key={group.date} className="group">
          <div className="date">{group.date.format('DD/MM/YYYY')}</div>
          {group.items.map(cashFlow => (
            <CashFlowItem
              key={cashFlow.id}
              className="item"
              cashFlow={cashFlow}
              edit={edit}
              remove={remove}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

CashFlowsList.propTypes = {
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

export default CashFlowsList;
