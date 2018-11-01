import React, {Component} from 'react';
import { connect } from 'react-redux'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom'
import {toggleMenu} from '../actions'

class Menu extends Component{
  toggleMenu=()=>{
    const {smUp, menuOpen, toggleMenu} = this.props;
    if(!smUp && menuOpen){
      toggleMenu();
    }
  }
  render(){
    return (
      <div>
        <Divider />
        <List>
            {/* <ListItem component={Link} to="/shipList/new" onClick={this.toggleMenu} button>
              <ListItemText primary="Adicionar Lista" />
            </ListItem> */}
            <ListItem component={Link} to="/category" onClick={this.toggleMenu} button>
              <ListItemText primary="Lista de Categorias" />
            </ListItem>
            <ListItem component={Link} to="/category/new" onClick={this.toggleMenu} button>
              <ListItemText primary="Adicionar Categoria" />
            </ListItem>
            <ListItem component={Link} to="/productType" onClick={this.toggleMenu} button>
              <ListItemText primary="Lista de Tipos de Produto" />
            </ListItem>
            <ListItem component={Link} to="/productType/new" onClick={this.toggleMenu} button>
              <ListItemText primary="Adicionar Tipo de Produto" />
            </ListItem>
            <ListItem component={Link} to="/product" onClick={this.toggleMenu} button>
              <ListItemText primary="Lista de Produtos" />
            </ListItem>
            <ListItem component={Link} to="/product/new" onClick={this.toggleMenu} button>
              <ListItemText primary="Adicionar Produto" />
            </ListItem>
        </List>
        <Divider />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    menuOpen: state.menu.menuOpen,
    smUp: state.menu.smUp
  }
};
const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => {
      dispatch(toggleMenu())
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Menu);