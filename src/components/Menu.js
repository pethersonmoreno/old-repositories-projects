import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {Link} from 'react-router-dom'

export default function Menu(){
  return (
    <div>
      <Divider />
      <List>
          <ListItem button>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="Compras" />
          </ListItem>
          <ListItem component={Link} to="/shipList/new" button>
            <ListItemText primary="Adicionar Lista" />
          </ListItem>
          <ListItem component={Link} to="/category" button>
            <ListItemText primary="Lista de Categorias" />
          </ListItem>
          <ListItem component={Link} to="/category/new" button>
            <ListItemText primary="Adicionar Categoria" />
          </ListItem>
          <ListItem component={Link} to="/product" button>
            <ListItemText primary="Lista de Produto" />
          </ListItem>
          <ListItem component={Link} to="/product/new" button>
            <ListItemText primary="Adicionar Produto" />
          </ListItem>
      </List>
      <Divider />
    </div>
  );
}

