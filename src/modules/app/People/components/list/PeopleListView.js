import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton, List, ListItem, ListDivider
} from '@morenobr/guideline-react';

const PeopleListView = ({
  add, edit, remove, list
}) => (
  <List>
    <ListItem
      text="Person"
      disabled
      contentRight={<IconButton secondary icon="add_circle" onClick={add} />}
    />
    {list.map((person, index) => (
      <>
        {index > 0 && <ListDivider asItem />}
        <ListItem
          key={person.id}
          text={person.name}
          onClick={edit(person)}
          contentRight={<IconButton primary icon="delete" onClick={remove(person)} />}
        />
      </>
    ))}
  </List>
);

PeopleListView.propTypes = {
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default PeopleListView;
