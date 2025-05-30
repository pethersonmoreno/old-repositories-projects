import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { operations } from 'controle-compras-frontend-redux/ducks/shipLists';
import Form from '../ShipListItemForm';

const backPath = shipListId => `/shipList/${shipListId}`;
const ShipListItemAdd = ({
  history, match, uid, addItem, updateShipListSelected,
}) => {
  const {
    params: { shipListId },
  } = match;
  return (
    <Form
      backPath={backPath(shipListId)}
      title="Novo Item"
      save={data => addItem(uid, shipListId, data)}
      onSaved={() => {
        updateShipListSelected(shipListId);
        history.push(backPath(shipListId));
      }}
    />
  );
};
ShipListItemAdd.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  addItem: PropTypes.func.isRequired,
  updateShipListSelected: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  uid: state.user.auth.uid,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addItem: operations.addItem,
    updateShipListSelected: operations.updateShipListSelected,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShipListItemAdd);
