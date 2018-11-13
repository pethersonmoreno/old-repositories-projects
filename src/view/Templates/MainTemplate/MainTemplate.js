import React, { Component } from 'react';
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

class MainTemplate extends Component {
  componentDidMount() {
    const { loadInitialData } = this.props;
    loadInitialData();
  }

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

MainTemplate.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  loadInitialData: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(MainTemplate);
