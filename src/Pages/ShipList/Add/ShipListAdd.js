import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { operations } from 'controle-compras-frontend-redux/ducks/shipLists';
import PageWithBackButtonTemplate from 'Templates/PageWithBackButtonTemplate';
import Form from '../ShipListForm';

const ShipListAdd = ({
  history, uid, add, updateShipListSelected,
}) => (
  <PageWithBackButtonTemplate backPath="/shipList" titulo="Nova Lista">
    <Form
      textoBotao="Adicionar"
      save={data => add(uid, data)}
      onSaved={({ value: { id } }) => {
        updateShipListSelected(id);
        history.push('/shipList');
      }}
    />
  </PageWithBackButtonTemplate>
);
ShipListAdd.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  add: PropTypes.func.isRequired,
  updateShipListSelected: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  uid: state.user.auth.uid,
});
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
