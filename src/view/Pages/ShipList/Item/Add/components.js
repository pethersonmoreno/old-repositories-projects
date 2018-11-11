import React from 'react';
import PropTypes from 'prop-types';
import PageTemplate from '../../../../Templates/PageTemplate';
import Form from '../../../../Organisms/ShipListItemForm';
import { shipListItems } from '../../../../data';

const addShipListItem = (shipListId, history, valores) => {
  shipListItems.push({ id: shipListItems.length + 1, shipListId, ...valores });
  history.push('/shipList');
};
const Add = ({ history, match }) => {
  const shipListId = parseInt(match.params.shipListId, 10);
  return (
    <PageTemplate titulo="Novo Item">
      <Form
        textoBotao="Adicionar"
        onSubmit={valores => addShipListItem(shipListId, history, valores)}
      />
    </PageTemplate>
  );
};
Add.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default Add;
