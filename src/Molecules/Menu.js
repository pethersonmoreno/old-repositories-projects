import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Collapse } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { operations } from 'controle-compras-frontend-redux/ducks/menu';

const styles = () => ({
  list: {
    '& .listItemActive': {
      '& .expandButton': {
        color: 'rgba(255, 255, 255, 0.95)',
      },
      backgroundColor: '#3f51b5',
      cursor: 'text',
      '& div': {
        '& span': {
          color: 'rgba(255, 255, 255, 0.95)',
        },
      },
      '&:hover': {
        backgroundColor: '#3f51b5',
      },
    },
  },
  subList: {
    backgroundColor: 'rgba(63, 81, 181, 0.05)',
    padding: '1px 0',
    '& > a': {
      paddingLeft: '40px',
    },
  },
});
const commonMenuItens = [
  { to: '/category', label: 'Categorias' },
  { to: '/product', label: 'Produtos' },
  { to: '/store', label: 'Lojas' },
];
const Menu = ({
  classes, toggleMenu, menuShipListsOpen, toggleMenuShipLists, shipLists,
}) => (
  <div>
    <Divider />
    <List className={classes.list}>
      <ListItem
        component={NavLink}
        activeClassName="listItemActive"
        exact
        to="/shipList"
        onClick={toggleMenu}
        button
      >
        <ListItemText primary="Listas de Compras" />
        <IconButton
          className="expandButton"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleMenuShipLists();
          }}
        >
          {menuShipListsOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItem>
      <Collapse in={menuShipListsOpen} timeout="auto" unmountOnExit>
        <List className={classes.subList}>
          {shipLists.map(shipList => (
            <ListItem
              key={shipList.id}
              component={NavLink}
              activeClassName="listItemActive"
              to={`/shipList/${shipList.id}`}
              onClick={toggleMenu}
              button
            >
              <ListItemText primary={shipList.description} />
            </ListItem>
          ))}
        </List>
      </Collapse>
      {commonMenuItens.map(menuItem => (
        <ListItem
          component={NavLink}
          activeClassName="listItemActive"
          to={menuItem.to}
          onClick={toggleMenu}
          button
        >
          <ListItemText primary={menuItem.label} />
        </ListItem>
      ))}
    </List>
    <Divider />
  </div>
);
Menu.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  toggleMenu: PropTypes.func.isRequired,
  toggleMenuShipLists: PropTypes.func.isRequired,
  menuShipListsOpen: PropTypes.bool.isRequired,
  shipLists: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  shipLists: state.shipLists.shipLists,
  menuShipListsOpen: state.menu.menuShipListsOpen,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    toggleMenuShipLists: operations.toggleMenuShipLists,
  },
  dispatch,
);
export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles, { withTheme: true }),
)(Menu);
