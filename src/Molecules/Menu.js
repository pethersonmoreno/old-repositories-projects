import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = () => ({
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
const Menu = ({ classes, toggleMenu }) => (
  <div>
    <Divider />
    <List>
      <ListItem
        component={NavLink}
        activeClassName={classes.listItemActive}
        to="/shipList"
        onClick={toggleMenu}
        button
      >
        <ListItemText primary="Listas de Compras" />
      </ListItem>
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
};
export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
)(Menu);
