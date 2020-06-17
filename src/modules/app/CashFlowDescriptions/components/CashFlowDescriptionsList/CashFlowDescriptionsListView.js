import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton, List, ListItem, ListDivider
} from '@morenobr/guideline-react';

const CashFlowDescriptionsListView = ({
  add, edit, remove, list
}) => (
  <div className="cf-paper">
    <List>
      <ListItem
        text="Description"
        disabled
        contentRight={<IconButton secondary icon="add_circle" onClick={add} />}
      />
      {list.map((cashFlowDescription, index) => (
        <>
          {index > 0 && <ListDivider asItem />}
          <ListItem
            key={cashFlowDescription.id}
            text={cashFlowDescription.name}
            onClick={edit(cashFlowDescription)}
            contentRight={<IconButton primary icon="delete" onClick={remove(cashFlowDescription)} />}
          />
        </>
      ))}
    </List>
  </div>
);

CashFlowDescriptionsListView.propTypes = {
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default CashFlowDescriptionsListView;
