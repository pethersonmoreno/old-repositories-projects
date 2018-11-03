import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import compose from 'recompose/compose';
import AppBarMaterialUI from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { menuWidth } from '../config.js';
import {toggleMenu} from '../actions'

const styles = theme => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${menuWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
});

function AppBar(props){
  const {classes, children, toggleMenu} = props;
  return (
    <AppBarMaterialUI position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Mostrar Menu"
          onClick={toggleMenu}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          {children}
        </Typography>
      </Toolbar>
    </AppBarMaterialUI>
  );
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
  }
};
const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => {
      dispatch(toggleMenu())
    }
  }
};

const VisibleAppBar = compose(
  connect(mapStateToProps,mapDispatchToProps),
  withStyles(styles, { withTheme: true }),
)(AppBar)
export default VisibleAppBar;