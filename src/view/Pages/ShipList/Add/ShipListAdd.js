import React from 'react';
import PropTypes from 'prop-types';
import PageTemplate from 'Templates/PageTemplate';
import Form from 'Organisms/ShipListForm';

const addShipList = (shipLists, history, valores, updateShipListSelected) => {
  const shipListId = shipLists.length + 1;
  shipLists.push({ id: shipListId, ...valores, items: [] });
  updateShipListSelected(shipListId);
  history.push('/shipList');
};
const Add = ({ history, shipLists, updateShipListSelected }) => (
  <PageTemplate titulo="Nova Lista">
    <Form
      textoBotao="Adicionar"
      onSubmit={valores => addShipList(shipLists, history, valores, updateShipListSelected)}
    />
  </PageTemplate>
);
Add.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  shipLists: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  updateShipListSelected: PropTypes.func.isRequired,
};

export default Add;
