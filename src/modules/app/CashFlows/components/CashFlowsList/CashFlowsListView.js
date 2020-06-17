import React from 'react';
import PropTypes from 'prop-types';
import {
  ListGroup, ListGroupItem, List, ListDivider,
} from '@morenobr/guideline-react';
import moment from 'moment';
import CashFlowItem from '../CashFlowItem';
import './CashFlowsListView.scss';

const CashFlowsListView = ({ listsByDates, edit, remove }) => (
  <ListGroup className="cashFlowsList">
    {listsByDates.map(group => (
      <ListGroupItem key={group.id} header={<span>{moment(new Date(group.date)).format('DD/MM/YYYY')}</span>}>
        <List twoLine withSelection>
          <ListDivider />
          {group.items.map(cashFlow => (
            <>
              <CashFlowItem
                key={cashFlow.id}
                className="item"
                cashFlow={cashFlow}
                edit={edit}
                remove={remove}
              />
              <ListDivider />
            </>
          ))}
        </List>
      </ListGroupItem>
    ))}
  </ListGroup>
);

CashFlowsListView.propTypes = {
  listsByDates: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      inOut: PropTypes.bool.isRequired,
      dateTime: PropTypes.string.isRequired,
      accountId: PropTypes.string.isRequired,
      cashFlowDescriptionId: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })).isRequired
  })).isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default CashFlowsListView;
