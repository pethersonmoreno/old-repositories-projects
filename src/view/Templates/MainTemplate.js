import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuResponsive from 'Organisms/MenuResponsive';

const styles = () => ({
  root: {
    display: 'flex',
    height: '100%',
  },
});

const App = (props) => {
  const { children, classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuResponsive />
      {children}
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles, { withTheme: true })(App);
