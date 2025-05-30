import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuResponsive from 'Organisms/MenuResponsive';
import { asyncOperation } from 'HOC/withAsyncOperation';
import { operations } from 'controle-compras-frontend-redux/ducks';
import withAuthorization from 'HOC/withAuthorization';

const styles = () => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
});

class MainAuthenticatedTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = { uid: props.uid };
  }

  componentDidMount() {
    const { startListenChanges } = this.props;
    const { uid } = this.state;
    asyncOperation(startListenChanges(uid));
  }

  componentWillUnmount() {
    const { stopListenChanges } = this.props;
    const { uid } = this.state;
    if (uid) {
      stopListenChanges(uid);
    }
  }

  render() {
    const { children, classes } = this.props;
    return (
      <div className={classes.root}>
        <MenuResponsive />
        <CssBaseline />
        {children}
      </div>
    );
  }
}

MainAuthenticatedTemplate.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  startListenChanges: PropTypes.func.isRequired,
  stopListenChanges: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  uid: state.user.auth.uid,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    startListenChanges: operations.startListenChanges,
    stopListenChanges: operations.stopListenChanges,
  },
  dispatch,
);
export default compose(
  withAuthorization({ loggedIn: true, emailVerified: true }, '/emailVerification'),
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles, { withTheme: true }),
)(MainAuthenticatedTemplate);
