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

const styles = () => ({
  subList: {
    backgroundColor: 'rgba(63, 81, 181, 0.05)',
    padding: '1px 0',
    '& > a': {
      paddingLeft: '40px',
    },
  },
  listItemActive: {
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
});
const Menu = ({ classes, toggleMenu, shipLists }) => (
  <div>
    <Divider />
    <List>
      <ListItem
        component={NavLink}
        activeClassName={classes.listItemActive}
        exact
        to="/shipList"
        onClick={toggleMenu}
        button
      >
        <ListItemText primary="Listas de Compras" />
      </ListItem>
      <List className={classes.subList}>
        {shipLists.map(shipList => (
          <ListItem
            key={shipList.id}
            component={NavLink}
            activeClassName={classes.listItemActive}
            to={`/shipList/${shipList.id}`}
            onClick={toggleMenu}
            button
          >
            <ListItemText primary={shipList.description} />
          </ListItem>
        ))}
      </List>
      <ListItem
        component={NavLink}
        activeClassName={classes.listItemActive}
        to="/category"
        onClick={toggleMenu}
        button
      >
        <ListItemText primary="Categorias" />
      </ListItem>
      <ListItem
        component={NavLink}
        activeClassName={classes.listItemActive}
        to="/productType"
        onClick={toggleMenu}
        button
      >
        <ListItemText primary="Tipos de Produto" />
      </ListItem>
      <ListItem
        component={NavLink}
        activeClassName={classes.listItemActive}
        to="/product"
        onClick={toggleMenu}
        button
      >
        <ListItemText primary="Produtos" />
      </ListItem>
    </List>
    <Divider />
  </div>
);
Menu.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  toggleMenu: PropTypes.func.isRequired,
  shipLists: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  shipLists: state.shipLists.shipLists,
});
const mapDispatchToProps = null;

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles, { withTheme: true }),
)(Menu);
