import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import { Grommet } from 'grommet';
import MainRouter from './routers/MainRouter';
import { getRedirectResult, isValidEmail, signInGoogleWithRedirect } from '../api/auth';
import AppContext from './contexts/AppContext';
import Spinner from './components/Spinner';

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};
class App extends Component {
  constructor(props) {
    super(props);
    const startedAuth = JSON.parse(localStorage.getItem('startedAuth'));
    const loading = JSON.parse(localStorage.getItem('loading'));
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    const token = JSON.parse(localStorage.getItem('token'));
    const isValidEmailBool = JSON.parse(localStorage.getItem('isValidEmail'));
    this.state = {
      startedAuth,
      loading,
      authenticated: !!userProfile,
      userProfile,
      token,
      isValidEmail: isValidEmailBool,
      showSidebar: false,
      pageTitle: '',
    };
  }


  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    this.listenerAuthStateChanged();
  }

  start = async () => {
    const startLoading = Promise.all([
      this.captureSigInRedirectResult(),
      this.captureAuthChanges()]);
    const { startedAuth, loading } = this.state;
    if (!startedAuth || loading) {
      await startLoading;
    }
    await this.updateLoading(false);
    localStorage.setItem('startedAuth', true);
    await this.setState({ startedAuth: true });
  }


  updateIsValidEmail = async () => {
    const { token } = this.state;
    const isValidEmailBool = token ? await isValidEmail(token) : false;
    localStorage.setItem('isValidEmail', JSON.stringify(isValidEmailBool));
    await this.setState({
      isValidEmail: isValidEmailBool
    });
  }

  updateUserProfile = async userProfile => {
    let token = null;
    if (userProfile) {
      token = await userProfile.getIdToken();
    }
    if (userProfile) {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('userProfile');
      localStorage.removeItem('token');
    }
    await this.setState({
      authenticated: !!userProfile,
      userProfile,
      token,
    });
    await this.updateIsValidEmail();
  }

  captureAuthChanges = () => {
    let firstAuthChanged = true;
    return new Promise(resolve => {
      this.listenerAuthStateChanged = firebase.auth().onAuthStateChanged(async user => {
        await this.updateUserProfile(user);
        if (firstAuthChanged) {
          firstAuthChanged = false;
          resolve();
        }
      });
    });
  }

  captureSigInRedirectResult = async () => {
    const userCredential = await getRedirectResult();
    if (userCredential.user) {
      await this.updateUserProfile(userCredential.user);
    }
  }

  updateLoading = loading => {
    localStorage.setItem('loading', JSON.stringify(loading));
    return this.setState({ loading });
  }

  signIn = async () => {
    this.updateLoading(true);
    signInGoogleWithRedirect();
  }


  toggleSideBar = () => {
    this.setState(prevState => ({ showSidebar: !prevState.showSidebar }));
  }

  hideSideBar = () => {
    this.setState({ showSidebar: false });
  }

  setPageTitle = pageTitle => {
    this.setState({ pageTitle });
  }

  render() {
    const { startedAuth, loading } = this.state;
    return (
      <AppContext.Provider value={{
        ...this.state,
        signIn: this.signIn,
        toggleSideBar: this.toggleSideBar,
        hideSideBar: this.hideSideBar,
        setPageTitle: this.setPageTitle,
      }}
      >
        <Grommet theme={theme} full>
          {(!startedAuth || loading) && (
            <Spinner />
          )}
          {(startedAuth && !loading) && (
            <MainRouter />
          )}
        </Grommet>
      </AppContext.Provider>
    );
  }
}

export default App;
