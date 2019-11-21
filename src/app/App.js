import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import { Grommet } from 'grommet';
import MainRouter from './routers/MainRouter';
import { getRedirectResult } from '../api/auth';
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
    this.state = {
      startedAuth: false,
      authenticated: false,
      userProfile: null,
      showSidebar: false,
      pageTitle: '',
    };
  }

  async componentDidMount() {
    await Promise.all([
      this.captureAuthChanges(),
      this.captureSigInRedirectResult()
    ]);
    this.setState({ startedAuth: true });
  }

  captureAuthChanges = () => {
    let firstAuthChanged = true;
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({
            authenticated: true,
            userProfile: user,
          });
        } else {
          this.setState({
            authenticated: false,
            userProfile: null,
          });
        }
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
      this.setState({
        authenticated: true,
        userProfile: userCredential.user,
      });
    }
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
    const { startedAuth } = this.state;
    return (
      <AppContext.Provider value={{
        ...this.state,
        toggleSideBar: this.toggleSideBar,
        hideSideBar: this.hideSideBar,
        setPageTitle: this.setPageTitle,
      }}
      >
        <Grommet theme={theme} full>
          {!startedAuth && (
            <Spinner />
          )}
          {startedAuth && (
            <MainRouter />
          )}
        </Grommet>
      </AppContext.Provider>
    );
  }
}

export default App;
