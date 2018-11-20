import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { operations } from 'controle-compras-frontend-redux/ducks/shipLists';
import PageTemplate from 'Templates/PageTemplate';
import Form from '../ShipListForm';

const ShipListAdd = ({ history, add, updateShipListSelected }) => (
  <PageTemplate titulo="Nova Lista">
    <Form
      textoBotao="Adicionar"
      save={add}
      onSaved={({ value: { id } }) => {
        updateShipListSelected(id);
        history.push('/shipList');
      }}
    />
  </PageTemplate>
);
ShipListAdd.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  add: PropTypes.func.isRequired,
  updateShipListSelected: PropTypes.func.isRequired,
};
const mapStateToProps = null;
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    add: operations.add,
    updateShipListSelected: operations.updateShipListSelected,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShipListAdd);
