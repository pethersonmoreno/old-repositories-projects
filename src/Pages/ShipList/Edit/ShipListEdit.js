import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PageTemplate from 'Templates/PageTemplate';
import { operations } from 'controle-compras-frontend-redux/ducks/shipLists';
import Form from '../ShipListForm';

const Edit = (props) => {
  const {
    history,
    match: {
      params: { id: shipListId },
    },
    shipLists,
    editShipList,
  } = props;
  const shipList = shipLists.find(list => list.id === shipListId);
  let conteudo = <Typography>Lista não encontrado</Typography>;
  if (shipList !== undefined) {
    conteudo = (
      <Form
        shipList={shipList}
        textoBotao="Alterar"
        onSubmit={(data) => {
          editShipList(shipListId, data);
          history.push('/shipList');
        }}
      />
    );
  }
  return <PageTemplate titulo="Editar Lista">{conteudo}</PageTemplate>;
};
Edit.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  shipLists: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  editShipList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  shipLists: state.shipLists.shipLists,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    editShipList: operations.editShipList,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit);
