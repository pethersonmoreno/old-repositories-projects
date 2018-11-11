import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const Menu = ({ toggleMenu }) => (
  <div>
    <Divider />
    <List>
      <ListItem component={Link} to="/shipList" onClick={toggleMenu} button>
        <ListItemText primary="Listas de Compras" />
      </ListItem>
      <ListItem component={Link} to="/category" onClick={toggleMenu} button>
        <ListItemText primary="Lista de Categorias" />
      </ListItem>
      <ListItem component={Link} to="/productType" onClick={toggleMenu} button>
        <ListItemText primary="Lista de Tipos de Produto" />
      </ListItem>
      <ListItem component={Link} to="/product" onClick={toggleMenu} button>
        <ListItemText primary="Lista de Produtos" />
      </ListItem>
    </List>
    <Divider />
  </div>
);
Menu.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
};
export default Menu;
