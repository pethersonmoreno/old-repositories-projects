import React, { Component } from 'react';
import axios from 'axios';
import * as firebase from 'firebase/app';
import logo from './logo.svg';
import './App.css';
import { getRedirectResult } from './api/auth';
import { startListenAuthChanges, stopListenAuthChanges } from './authState';
import SignInWithBox from './SignInWithBox';

const signByRedirectResult = async () => {
  const userCredential = await getRedirectResult();
  return userCredential.user;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: []
    };
  }

  async componentDidMount() {
    try {
      const [authChangesResult, userLogged] = await Promise.all([
        startListenAuthChanges(),
        signByRedirectResult()
      ]);
      // eslint-disable-next-line no-console
      console.log('authChangesResult: ', authChangesResult);
      // eslint-disable-next-line no-console
      console.log('userLogged: ', userLogged);
    } catch (error) {
      console.log(error.message);
      console.log(error);
    }
    const token = await firebase.auth().currentUser.getIdToken();
    const { data: people } = await axios.get(
      `${process.env.REACT_APP_API_URL}/people`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    this.setState({ people });
  }

  componentWillUnmount() {
    stopListenAuthChanges();
  }

  render() {
    const { people } = this.state;
    return (
      <div className="App">
        <div>
          <SignInWithBox />
        </div>
        <div>
          <ul>
            {people.map(person => (
              <li key={person.id}>{person.name}</li>
            ))}
          </ul>
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit
            <span> </span>
            <code>src/App.js</code>
            <span> </span>
            and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
