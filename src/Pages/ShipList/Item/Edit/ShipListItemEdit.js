import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { operations } from 'controle-compras-frontend-redux/ducks/shipLists';
import Form from '../ShipListItemForm';

const backPath = shipListId => `/shipList/${shipListId}`;
const ShipListItemEdit = ({
  history,
  match,
  uid,
  shipLists,
  editItem,
  removeItem,
  updateShipListSelected,
}) => {
  const {
    params: { shipListId, id: shipListItemId },
  } = match;
  const shipList = shipLists.find(i => i.id === shipListId);
  let shipListItem;
  if (shipList && shipList.items) {
    shipListItem = shipList.items.find(item => item.id === shipListItemId);
  }
  return (
    <Form
      backPath={backPath(shipListId)}
      editing
      title="Editar Item"
      item={shipListItem}
      save={data => editItem(uid, shipListId, shipListItemId, data)}
      onSaved={() => {
        updateShipListSelected(shipListId);
        history.push(backPath(shipListId));
      }}
      remove={() => {
        updateShipListSelected(shipListId);
        history.push(backPath(shipListId));
        return removeItem(uid, shipListId, shipListItemId);
      }}
    />
  );
};
ShipListItemEdit.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  shipLists: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  editItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  updateShipListSelected: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  uid: state.user.auth.uid,
  shipLists: state.shipLists.shipLists,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    editItem: operations.editItem,
    removeItem: operations.removeItem,
    updateShipListSelected: operations.updateShipListSelected,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShipListItemEdit);
