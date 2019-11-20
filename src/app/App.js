import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import MainRouter from './routers/MainRouter';
import AuthenticatedRouter from './routers/AuthenticatedRouter';
import { getRedirectResult } from '../api/auth';
import AppContext from './contexts/AppContext';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      userProfile: null,
    };
  }

  async componentDidMount() {
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
    });
    const userCredential = await getRedirectResult();
    if (userCredential.user) {
      this.setState({
        authenticated: true,
        userProfile: userCredential.user,
      });
    }
  }

  render() {
    const { authenticated, userProfile } = this.state;
    return (
      <AppContext.Provider value={{
        authenticated,
        userProfile,
      }}
      >
        <MainRouter>
          <AuthenticatedRouter />
        </MainRouter>
      </AppContext.Provider>
    );
  }
}

export default App;
