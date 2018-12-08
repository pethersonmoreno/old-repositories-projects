import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Menu from 'Molecules/Menu';
import { operations } from 'controle-compras-frontend-redux/ducks/menu';
import { menuWidth } from '../config';

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: menuWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    position: 'absolute',
    width: menuWidth,
  },
});

class MenuResponsive extends React.Component {
  componentWillMount() {
    this.updateSmUp();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateSmUp);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSmUp);
  }

  updateSmUp = () => {
    // const { updateSmUp } = this.props;
    if (this.timeoutUpdateSmUp) {
      clearTimeout(this.timeoutUpdateSmUp);
    }
    this.timeoutUpdateSmUp = setTimeout(() => {
      // const newSmUp = document.body.clientWidth >= 600;
      // updateSmUp(newSmUp);
      this.timeoutUpdateSmUp = null;
    }, 100);
  };

  toggleInsideMenu = () => {
    const { smUp, menuOpen, toggleMenu } = this.props;
    if (!smUp && menuOpen) {
      toggleMenu();
    }
  };

  render() {
    const {
      classes, theme, menuOpen, toggleMenu, smUp,
    } = this.props;
    return (
      <nav className={classes.drawer}>
        {/* The implementation can be swap with js to avoid SEO duplication of links. */}
        {!smUp && (
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={menuOpen}
            onClose={toggleMenu}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <Menu toggleMenu={this.toggleInsideMenu} />
          </Drawer>
        )}
        {smUp && (
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <Menu toggleMenu={this.toggleInsideMenu} />
          </Drawer>
        )}
      </nav>
    );
  }
}

MenuResponsive.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  menuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  // updateSmUp: PropTypes.func.isRequired,
  smUp: PropTypes.bool.isRequired,
};

export default compose(
  withRouter,
  connect(
    state => ({ ...state.menu }),
    { ...operations },
  ),
  withStyles(styles, { withTheme: true }),
)(MenuResponsive);
