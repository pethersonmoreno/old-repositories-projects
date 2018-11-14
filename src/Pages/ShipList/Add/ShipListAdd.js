import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { operations } from 'controle-compras-frontend-redux/ducks/shipLists';
import PageTemplate from 'Templates/PageTemplate';
import Form from '../ShipListForm';

const ShipListAdd = ({ history, addShipList }) => (
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
ShipListAdd.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  addShipList: PropTypes.func.isRequired,
};
const mapStateToProps = null;
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addShipList: operations.addShipList,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShipListAdd);
