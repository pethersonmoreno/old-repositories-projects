import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from './AppBar';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});
function AppContent({children, classes, titulo}){
  return (
    <div>
      <AppBar>{titulo}</AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className="contentPage">
          {children}
        </div>
      </main>
    </div>
  );
}

AppContent.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  titulo: PropTypes.string.isRequired,
};
export default withStyles(styles, { withTheme: true })(AppContent);