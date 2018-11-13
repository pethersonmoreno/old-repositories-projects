import React from 'react';
import PropTypes from 'prop-types';
import PageTemplate from 'Templates/PageTemplate';
import Form from 'Organisms/ShipListForm';

const Add = ({ history, addShipList }) => (
  <PageTemplate titulo="Nova Lista">
    <Form
      textoBotao="Adicionar"
      onSubmit={(data) => {
        addShipList(data);
        history.push('/shipList');
      }}
    />
  </PageTemplate>
);
Add.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  addShipList: PropTypes.func.isRequired,
};

export default Add;
