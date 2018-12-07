import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import AppBarMaterialUI from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DoneIcon from '@material-ui/icons/Done';
import AccountMenu from './AccountMenu';
import { menuWidth } from '../config';

const styles = theme => ({
  appBar: {
    position: 'absolute',
    top: 0,
    left: 'auto',
    right: 0,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${menuWidth}px)`,
    },
    '& > .toolBar': {
      display: 'flex',
      paddingLeft: '15px',
      paddingRight: '15px',
      '& > .menuButton': {
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      },
      '& > .title': {
        flex: 1,
        '&.withoutGoBack': {
          [theme.breakpoints.up('sm')]: {
            paddingLeft: '12px',
          },
        },
      },
    },
  },
});

const AppBar = ({
  classes, children, toggleMenu, goBack, onDone, withButtonAccount,
}) => (
  <AppBarMaterialUI position="fixed" className={`${classes.appBar} appBar`}>
    <Toolbar className="toolBar">
      {!goBack && (
        <IconButton
          color="inherit"
          aria-label="Mostrar Menu"
          onClick={toggleMenu}
          className="menuButton"
        >
          <MenuIcon />
        </IconButton>
      )}
      {goBack && (
        <IconButton color="inherit" aria-label="Voltar" onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
      )}
      <Typography
        className={`title ${!goBack ? 'withoutGoBack' : ''}`}
        variant="h6"
        color="inherit"
        noWrap
      >
        {children}
      </Typography>
      {onDone && (
        <IconButton color="inherit" aria-label="Confirmar" onClick={onDone}>
          <DoneIcon />
        </IconButton>
      )}
      {(withButtonAccount || (withButtonAccount === null && !onDone)) && (
        <AccountMenu className="accountMenu" />
      )}
    </Toolbar>
  </AppBarMaterialUI>
);

AppBar.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  goBack: PropTypes.func,
  toggleMenu: PropTypes.func,
  onDone: PropTypes.func,
  withButtonAccount: PropTypes.bool,
};
AppBar.defaultProps = {
  goBack: null,
  toggleMenu: null,
  onDone: null,
  withButtonAccount: null,
};
export default compose(withStyles(styles, { withTheme: true }))(AppBar);
