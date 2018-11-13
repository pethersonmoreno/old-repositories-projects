import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PageTemplate from 'Templates/PageTemplate';
import Form from 'Organisms/ShipListForm';

const editShipList = (shipLists, shipListId, history, valores) => {
  const shipList = shipLists.find(list => list.id === shipListId);
  shipList.description = valores.description;
  history.push('/shipList');
};
const Edit = ({ history, match, shipLists }) => {
  const shipListId = parseInt(match.params.id, 10);
  const shipList = shipLists.find(list => list.id === shipListId);
  let conteudo = <Typography>Lista não encontrado</Typography>;
  if (shipList !== undefined) {
    conteudo = (
      <Form
        shipList={shipList}
        textoBotao="Alterar"
        onSubmit={valores => editShipList(shipLists, shipListId, history, valores)}
      />
    );
  }
  return <PageTemplate titulo="Editar Lista">{conteudo}</PageTemplate>;
};
Edit.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  shipLists: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(
  state => ({ ...state.data }),
  null,
)(Edit);
