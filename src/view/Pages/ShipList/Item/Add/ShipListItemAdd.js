import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageTemplate from 'Templates/PageTemplate';
import Form from 'Organisms/ShipListItemForm';

const addShipListItem = (shipListItems, shipListId, history, valores) => {
  shipListItems.push({ id: shipListItems.length + 1, shipListId, ...valores });
  history.push('/shipList');
};
const Add = ({ history, match, shipListItems }) => {
  const shipListId = parseInt(match.params.shipListId, 10);
  return (
    <PageTemplate titulo="Novo Item">
      <Form
        textoBotao="Adicionar"
        onSubmit={valores => addShipListItem(shipListItems, shipListId, history, valores)}
      />
    </PageTemplate>
  );
};
Add.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  shipListItems: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default connect(
  state => ({ ...state.data }),
  null,
)(Add);
