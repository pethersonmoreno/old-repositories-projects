import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
import { connect, Provider as ReduxProvider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { BrowserRouter, HashRouter, withRouter } from 'react-router-dom';
import { route } from 'Pages';
import store from 'controle-compras-frontend-redux/store';
import NotificationSystem from 'react-notification-system';
import { setNotificationSystem } from 'HOC/withNotification';
import Loader from 'Molecules/Loader';
import { asyncOperation } from 'HOC/withAsyncOperation';
import { operations } from 'controle-compras-frontend-redux/ducks/auth';
import './RootTemplate.css';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true,
  },
});
const NavigationRouter = process.env.NODE_ENV !== 'development' ? HashRouter : BrowserRouter;
const styles = () => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
});
class ContainerRoutes extends Component {
  componentDidMount() {
    const { startListenAuthChanges, startListenUserReloads } = this.props;
    asyncOperation(Promise.all([
      startListenAuthChanges(),
      startListenUserReloads(),
    ]));
  }

  componentWillUnmount() {
    const { stopListenAuthChanges, stopListenUserReloads } = this.props;
    stopListenAuthChanges();
    stopListenUserReloads();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {route}
        <NotificationSystem
          ref={(ref) => {
            setNotificationSystem(ref);
          }}
        />
        <Loader />
      </div>
    );
  }
}
ContainerRoutes.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  startListenAuthChanges: PropTypes.func.isRequired,
  stopListenAuthChanges: PropTypes.func.isRequired,
  startListenUserReloads: PropTypes.func.isRequired,
  stopListenUserReloads: PropTypes.func.isRequired,
};
const mapStateToProps = null;
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    startListenAuthChanges: operations.startListenAuthChanges,
    stopListenAuthChanges: operations.stopListenAuthChanges,
    startListenUserReloads: operations.startListenUserReloads,
    stopListenUserReloads: operations.stopListenUserReloads,
  },
  dispatch,
);
const ContainerRoutesStylezed = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles, { withTheme: true }),
)(ContainerRoutes);
const RootTemplate = () => (
  <MuiThemeProvider theme={theme}>
    <ReduxProvider store={store}>
      <NavigationRouter basename={process.env.PUBLIC_URL}>
        <ContainerRoutesStylezed />
      </NavigationRouter>
    </ReduxProvider>
  </MuiThemeProvider>
);

export default RootTemplate;
