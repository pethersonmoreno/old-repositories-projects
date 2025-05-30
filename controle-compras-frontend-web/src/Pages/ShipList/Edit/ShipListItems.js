import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles, IconButton } from '@material-ui/core';
import List from '@material-ui/core/List';
import DeleteIcon from '@material-ui/icons/Delete';
import { currency } from 'helpers/format';
import InputIntegerWithButtons from 'Atoms/InputIntegerWithButtons';
import { operations } from 'controle-compras-frontend-redux/ducks/shipLists';
import { asyncOperation } from 'HOC/withAsyncOperation';
import PaperListItem from 'Atoms/PaperListItem';

const styles = () => ({
  item: {
    '& > .content': {
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      boxSizing: 'border-box',
      // justifyContent: 'center',
      '& > .multiply': {
        fontSize: '1.2em',
        margin: '0 10px',
      },
      '& > .containerDescriptionNote': {
        flex: 1,
        '& > .description': {},
        '& > .note': {
          marginLeft: '5px',
          fontSize: '0.9em',
          color: 'rgba(0,0,0, 0.8)',
        },
      },
    },
    '& > .contentRight': {
      textAlign: 'right',
      '& > .price': {
        fontSize: '1.2em',
        textAlign: 'right',
      },
    },
  },
});
const updateQtdItem = (editItem, uid, shipListId, item, qtd) => {
  asyncOperation(() => editItem(uid, shipListId, item.id, { ...item, qtd }), {
    successMessage: 'Sucesso ao alterar quantidade do item',
    errorMessage: 'Erro ao alterar quantidade do item',
  });
};
const removeItemPrepared = (removeItem, uid, shipListId, idItem) => {
  asyncOperation(() => removeItem(uid, shipListId, idItem), {
    successMessage: 'Sucesso ao remover item',
    errorMessage: 'Erro ao remover item',
  });
};
const ShipListItems = ({
  history,
  classes,
  shipList,
  uid,
  editItem,
  removeItem,
}) => (
  <List disablePadding>
    {shipList.items
      && shipList.items.map(item => (
        <PaperListItem
          button
          key={item.id}
          className={classes.item}
          onClick={() => history.push(`/shipList/${shipList.id}/item/${item.id}`)}
        >
          <div className="content">
            <InputIntegerWithButtons
              buttonSize="little"
              textField={false}
              value={item.qtd}
              onChange={qtd => updateQtdItem(editItem, uid, shipList.id, item, qtd)}
            />
            <span className="multiply">X</span>
            <div className="containerDescriptionNote">
              <div className="description">{item.description}</div>
              <div className="note">{item.note}</div>
            </div>
          </div>
          <div className="contentRight">
            <span className="price">{currency(item.currentPrice)}</span>
            <IconButton onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              removeItemPrepared(removeItem, uid, shipList.id, item.id);
            }}
            >
              <DeleteIcon color="primary" />
            </IconButton>
          </div>
        </PaperListItem>
      ))}
    {shipList.items && (
      <PaperListItem className={classes.item}>
        <div className="contentRight">
          <div className="price">
            {currency(
              shipList.items.map(item => item.qtd * item.currentPrice).reduce((a, b) => a + b, 0),
            )}
          </div>
          <div className="removeButton" />
        </div>
      </PaperListItem>
    )}
  </List>
);
ShipListItems.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  shipList: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  editItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  uid: state.user.auth.uid,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    editItem: operations.editItem,
    removeItem: operations.removeItem,
  },
  dispatch,
);
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles, { withTheme: true }),
  withRouter,
)(ShipListItems);
