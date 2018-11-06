import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Menu from '../../Molecules/Menu';
import { menuWidth } from '../../config';
import {STATE_NAME} from './constants'
import {toggleMenu, updateSmUp} from './actions'

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
  constructor(props){
    super(props);
    this.state = {
      smUp: false,
    };
    this.updateSmUp = this.updateSmUp.bind(this);
  }
  
  updateSmUp(){
    const {smUp, updateSmUp} = this.props;
    const newSmUp = (document.body.clientWidth >= 600);
    if(newSmUp !== smUp){
      updateSmUp(newSmUp);
    }
  }
  componentWillMount() {
    this.updateSmUp();
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateSmUp);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSmUp);
  }
  toggleInsideMenu=()=>{
    const {smUp, menuOpen, toggleMenu} = this.props;
    if(!smUp && menuOpen){
      toggleMenu();
    }
  }
  render(){
    const { classes, theme, menuOpen, toggleMenu } = this.props;
    return (
      <nav className={classes.drawer}>
        {/* The implementation can be swap with js to avoid SEO duplication of links. */}
        {!this.props.smUp && 
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
        }
        {this.props.smUp && 
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <Menu toggleMenu={this.toggleInsideMenu} />
          </Drawer>
        }
      </nav>
    );
  }
}

MenuResponsive.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state[STATE_NAME]
});
const mapDispatchToProps = dispatch => 
  bindActionCreators({
    toggleMenu,
    updateSmUp
  }, dispatch);

const VisibleMenuResponsive = compose(
  connect(mapStateToProps,mapDispatchToProps),
  withStyles(styles, { withTheme: true }),
)(MenuResponsive)

export default VisibleMenuResponsive;