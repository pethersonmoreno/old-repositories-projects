import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../Molecules/AppBar';
import { menuWidth } from '../config.js';
import {toggleMenu} from '../Organisms/MenuResponsive/actions'

const styles = theme => ({
  main:{
    height: '100%',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${menuWidth}px)`,
    },
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100%',
  },
  contentPadding: {
    padding: theme.spacing.unit * 3,
  },
  contentPage: {
    height: '100%',
  },
});
const AppContent = ({toggleMenu, classes, children, titulo, removePadding})=>{
  let classContent = classes.content;
  if(!removePadding){
    classContent += ' '+classes.contentPadding;
  }
  return (
    <main className={classes.main}>
      <AppBar toggleMenu={toggleMenu}>{titulo}</AppBar>
      <div className={classContent}>
        <div className={classes.toolbar} />
        <div className={classes.contentPage}>
          {children}
        </div>
      </div>
    </main>
  );
}

AppContent.propTypes = {
  children: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  titulo: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => 
  bindActionCreators({
    toggleMenu
  }, dispatch);

const VisibleAppContent = compose(
  connect(mapStateToProps,mapDispatchToProps),
  withStyles(styles, { withTheme: true }),
)(AppContent)
export default VisibleAppContent;