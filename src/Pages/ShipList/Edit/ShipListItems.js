import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { currency } from 'helpers/format';
import InputIntegerWithButtons from 'Atoms/InputIntegerWithButtons';
import { operations } from 'controle-compras-frontend-redux/ducks/shipLists';
import { asyncOperation } from 'HOC/withAsyncOperation';

const styles = () => ({
  list: {
    backgroundColor: '#ffffff',
  },
  item: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    padding: '12px 16px',
    boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2)',
    borderRadius: '1%',
    '& > .containerQtdDescription': {
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 0,
      maxWidth: '83.333333%',
      flexBasis: '83.333333%',
      display: 'flex',
      flexWrap: 'wrap',
      boxSizing: 'border-box',
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
    '& > .price': {
      flex: 1,
      fontSize: '1.2em',
      textAlign: 'right',
    },
  },
});
const updateQtdItem = (editItem, uid, shipListId, item, qtd) => {
  asyncOperation(() => editItem(uid, shipListId, item.id, { ...item, qtd }), {
    successMessage: 'Sucesso ao alterar quantidade do item',
    errorMessage: 'Erro ao alterar quantidade do item',
  });
};
const ShipListItems = ({
  history, classes, shipList, uid, editItem,
}) => (
  <List disablePadding className={classes.list}>
    {shipList.items
      && shipList.items.map(item => (
        <ListItem
          button
          key={item.id}
          className={classes.item}
          onClick={() => history.push(`/shipList/${shipList.id}/item/${item.id}`)}
        >
          <div className="containerQtdDescription">
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
          <div className="price">{currency(item.currentPrice)}</div>
        </ListItem>
      ))}
    {shipList.items && (
      <ListItem className={classes.item}>
        <div className="containerQtdDescription" />
        <div className="price">
          {currency(
            shipList.items.map(item => item.qtd * item.currentPrice).reduce((a, b) => a + b, 0),
          )}
        </div>
      </ListItem>
    )}
  </List>
);
ShipListItems.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  shipList: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  editItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  uid: state.user.auth.uid,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    editItem: operations.editItem,
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
