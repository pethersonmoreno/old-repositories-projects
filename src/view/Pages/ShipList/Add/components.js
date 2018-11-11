import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PageTemplate from '../../../Templates/PageTemplate';
import Form from '../../../Organisms/ShipListForm';
import { shipLists } from '../../../../data';
import { operations } from '../../../../state/ducks/shipList';

const addShipList = (history, valores, updateShipListSelected) => {
  const shipListId = shipLists.length + 1;
  shipLists.push({ id: shipListId, ...valores, items: [] });
  updateShipListSelected(shipListId);
  history.push('/shipList');
};
const Add = ({ history, updateShipListSelected }) => (
  <PageTemplate titulo="Nova Lista">
    <Form
      textoBotao="Adicionar"
      onSubmit={valores => addShipList(history, valores, updateShipListSelected)}
    />
  </PageTemplate>
);
Add.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  updateShipListSelected: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateShipListSelected: operations.updateShipListSelected,
  },
  dispatch,
);

export default connect(
  null,
  mapDispatchToProps,
)(Add);
