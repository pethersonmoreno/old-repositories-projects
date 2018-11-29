import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import AppBarMaterialUI from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
    marginRight: 15,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  backButton: {
    marginRight: 15,
  },
  accountMenu: {
    position: 'absolute',
    right: '0px',
  },
});

const AppBar = ({
  classes, children, toggleMenu, goBack, withButtonAccount,
}) => {
  let withButtonMenu = true;
  let withButtonBack = false;
  if (goBack) {
    withButtonMenu = false;
    withButtonBack = true;
  }
  return (
    <AppBarMaterialUI position="fixed" className={classes.appBar}>
      <Toolbar>
        {withButtonMenu && (
          <IconButton
            color="inherit"
            aria-label="Mostrar Menu"
            onClick={toggleMenu}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        )}
        {withButtonBack && (
          <IconButton
            color="inherit"
            aria-label="Voltar"
            onClick={goBack}
            className={classes.backButton}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" color="inherit" noWrap>
          {children}
        </Typography>
        {withButtonAccount && <AccountMenu className={classes.accountMenu} />}
      </Toolbar>
    </AppBarMaterialUI>
  );
};

AppBar.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.string.isRequired,
  goBack: PropTypes.func,
  toggleMenu: PropTypes.func,
  withButtonAccount: PropTypes.bool,
};
AppBar.defaultProps = {
  goBack: null,
  toggleMenu: null,
  withButtonAccount: true,
};
export default compose(withStyles(styles, { withTheme: true }))(AppBar);
