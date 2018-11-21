import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { asyncOperation } from 'HOC/withAsyncOperation';
import { operations } from 'controle-compras-frontend-redux/ducks/auth';

class AccountMenu extends Component {
  state = {
    anchorEl: null,
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      className, auth, signOut, history,
    } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={className}>
        {auth.loggedIn && (
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem>Minha Conta</MenuItem>
              <MenuItem
                onClick={() => asyncOperation(() => signOut(), {
                  successMessage: 'Sucesso ao efetuar Logout',
                  successCallback: () => history.push('/signin'),
                  errorMessage: 'Falha ao efetuar Logout',
                })
                }
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
    );
  }
}
AccountMenu.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  signOut: PropTypes.func.isRequired,
  className: PropTypes.string,
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool,
    email: PropTypes.string,
  }),
};
AccountMenu.defaultProps = {
  className: null,
  auth: {
    loggedIn: false,
    email: null,
  },
};
const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    signOut: operations.signOut,
  },
  dispatch,
);
export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AccountMenu);
