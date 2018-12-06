import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import PageTemplate from 'Templates/PageTemplate';
import ButtonFabContainer from 'Atoms/ButtonFabContainer';
import ButtonFab from 'Atoms/ButtonFab';
import AddIcon from '@material-ui/icons/Add';
import PaperListItem from 'Atoms/PaperListItem';
import { asyncOperation } from 'HOC/withAsyncOperation';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { operations } from 'controle-compras-frontend-redux/ducks/shipLists';
import { bindActionCreators } from 'redux';

const ShipListList = ({
  history, uid, shipLists, remove,
}) => (
  <PageTemplate titulo="Não esqueça!">
    <List disablePadding>
      {shipLists.map(shipList => (
        <PaperListItem
          button
          key={shipList.id}
          onClick={() => history.push(`/shipList/${shipList.id}`)}
        >
          <div className="content">{shipList.description}</div>
          <div className="contentRight">
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                asyncOperation(() => remove(uid, shipList.id), {
                  successMessage: `Sucesso ao remover Lista ${shipList.description}`,
                  errorMessage: `Erro ao remover Lista ${shipList.description}`,
                });
              }}
            >
              <DeleteIcon color="primary" />
            </IconButton>
          </div>
        </PaperListItem>
      ))}
    </List>
    <ButtonFabContainer>
      <ButtonFab onClick={() => history.push('/shipList/new')}>
        <AddIcon />
      </ButtonFab>
    </ButtonFabContainer>
  </PageTemplate>
);
ShipListList.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  shipLists: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  remove: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  uid: state.user.auth.uid,
  shipLists: state.shipLists.shipLists,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    remove: operations.remove,
  },
  dispatch,
);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ShipListList);
