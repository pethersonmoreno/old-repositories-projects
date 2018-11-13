import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PageTemplate from 'Templates/PageTemplate';
import Form from 'Organisms/ShipListItemForm';

const editShipListItem = (shipListItems, shipListItemId, history, valores) => {
  const shipListItem = shipListItems.find(item => item.id === shipListItemId);
  Object.assign(shipListItem, valores);
  history.push('/shipList');
};
const Edit = ({ history, match, shipListItems }) => {
  const shipListItemId = parseInt(match.params.id, 10);
  const shipListItem = shipListItems.find(item => item.id === shipListItemId);
  let conteudo = <Typography>Item não encontrado</Typography>;
  if (shipListItem !== undefined) {
    conteudo = (
      <Form
        item={shipListItem}
        textoBotao="Alterar"
        onSubmit={valores => editShipListItem(shipListItems, shipListItemId, history, valores)}
      />
    );
  }
  return <PageTemplate titulo="Editar Item">{conteudo}</PageTemplate>;
};
Edit.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  shipListItems: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
const mapStateToProps = state => ({
  shipListItems: state.data.shipListItems,
});
const mapDispatchToProps = null;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit);
