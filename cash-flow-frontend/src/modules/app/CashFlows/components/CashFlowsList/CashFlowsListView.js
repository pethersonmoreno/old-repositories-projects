import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CashFlowItem from '../CashFlowItem';
import './CashFlowsListView.scss';

const CashFlowsListView = ({ listsByDates, edit, remove }) => (
  <div className="cashFlowsList">
    {listsByDates.map(group => (
      <div key={group.date} className="group">
        <div className="date">{moment(group.date).format('DD/MM/YYYY')}</div>
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

CashFlowsListView.propTypes = {
  listsByDates: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      inOut: PropTypes.bool.isRequired,
      dateTime: PropTypes.instanceOf(Date).isRequired,
      accountId: PropTypes.string.isRequired,
      cashFlowDescriptionId: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })).isRequired
  })).isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default CashFlowsListView;
