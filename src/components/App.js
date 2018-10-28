import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuResponsive from './MenuResponsive';

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

class App extends React.Component {
  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <MenuResponsive />
        {children}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);