import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Menu from '../../Molecules/Menu';
import { menuWidth } from '../../config';
import { STATE_NAME } from './constants';
import { toggleMenu as actionToggleMenu, updateSmUp as actionUpdateSmUp } from './actions';

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: menuWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
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
    const { updateSmUp } = this.props;
    const newSmUp = document.body.clientWidth >= 600;
    updateSmUp(newSmUp);
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
  updateSmUp: PropTypes.func.isRequired,
  smUp: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  ...state[STATE_NAME],
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    toggleMenu: actionToggleMenu,
    updateSmUp: actionUpdateSmUp,
  },
  dispatch,
);

const VisibleMenuResponsive = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles, { withTheme: true }),
)(MenuResponsive);

export default VisibleMenuResponsive;
