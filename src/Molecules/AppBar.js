import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBarMaterialUI from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AccountMenu from './AccountMenu';
import { menuWidth } from '../config';

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
  accountMenu: {
    position: 'absolute',
    right: '0px',
  },
});

const AppBar = ({ classes, children, toggleMenu }) => (
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
      <AccountMenu className={classes.accountMenu} />
    </Toolbar>
  </AppBarMaterialUI>
);

AppBar.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  toggleMenu: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
export default withStyles(styles, { withTheme: true })(AppBar);
