import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from './AppBar';
import { menuWidth } from './appConfig.js';

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
function AppContent({children, classes, titulo, removePadding}){
  let classContent = classes.content;
  if(!removePadding){
    classContent += ' '+classes.contentPadding;
  }
  return (
    <main className={classes.main}>
      <AppBar>{titulo}</AppBar>
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
export default withStyles(styles, { withTheme: true })(AppContent);