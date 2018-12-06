import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import PageWithBackButtonTemplate from 'Templates/PageWithBackButtonTemplate';
import { operations } from 'controle-compras-frontend-redux/ducks/shipLists';
import TextEditable from 'Atoms/TextEditable';
import { asyncOperation } from 'HOC/withAsyncOperation';
import ButtonFabContainer from 'Atoms/ButtonFabContainer';
import ButtonFab from 'Atoms/ButtonFab';
import ShipListItems from './ShipListItems';

const ShipListEdit = (props) => {
  const {
    history,
    match: {
      params: { id: shipListId },
    },
    uid,
    shipLists,
    edit,
  } = props;
  const shipList = shipLists.find(list => list.id === shipListId);
  let titulo = 'Editar Lista';
  let conteudo = <Typography>Lista não encontrado</Typography>;
  if (shipList) {
    conteudo = (
      <div>
        <ShipListItems shipList={shipList} />
        <ButtonFabContainer>
          <ButtonFab onClick={() => history.push(`/shipList/${shipList.id}/item/new`)}>
            <AddIcon />
          </ButtonFab>
        </ButtonFabContainer>
      </div>
    );
    titulo = (
      <TextEditable
        onConfirm={value => asyncOperation(() => edit(uid, shipListId, { description: value }), {
          successMessage: `Sucesso ao alterar descrição da Lista de Compras ${value}`,
          errorMessage: `Erro ao alterar descrição da Lista de Compras ${value}`,
        })
        }
        value={shipList.description}
      />
    );
  }
  return (
    <PageWithBackButtonTemplate backPath="/shipList" titulo={titulo}>
      {conteudo}
    </PageWithBackButtonTemplate>
  );
};
ShipListEdit.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  shipLists: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  edit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  uid: state.user.auth.uid,
  shipLists: state.shipLists.shipLists,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    edit: operations.edit,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShipListEdit);
