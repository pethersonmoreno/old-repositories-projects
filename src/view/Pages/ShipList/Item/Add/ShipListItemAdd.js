import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageTemplate from 'Templates/PageTemplate';
import { operations } from 'state/ducks/shipLists';
import Form from '../ShipListItemForm';

const ShipListItemAdd = ({ history, match, addShipListItem }) => {
  const shipListId = parseInt(match.params.shipListId, 10);
  return (
    <PageTemplate titulo="Novo Item">
      <Form
        textoBotao="Adicionar"
        onSubmit={(data) => {
          addShipListItem(shipListId, data);
          history.push('/shipList');
        }}
      />
    </PageTemplate>
  );
};
ShipListItemAdd.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  addShipListItem: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  shipLists: state.shipLists.shipLists,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addShipListItem: operations.addShipListItem,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShipListItemAdd);
