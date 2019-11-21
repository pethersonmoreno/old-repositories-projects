import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import MainRouter from './routers/MainRouter';
import { getRedirectResult } from '../api/auth';
import AppContext from './contexts/AppContext';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      userProfile: null,
      showSidebar: false,
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

  toggleSideBar = () => {
    this.setState(prevState => ({ showSidebar: !prevState.showSidebar }));
  }

  hideSideBar = () => {
    this.setState({ showSidebar: false });
  }

  render() {
    return (
      <AppContext.Provider value={{
        ...this.state,
        toggleSideBar: this.toggleSideBar,
        hideSideBar: this.hideSideBar,
      }}
      >
        <MainRouter />
      </AppContext.Provider>
    );
  }
}

export default App;
