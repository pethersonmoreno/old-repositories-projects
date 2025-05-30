import React from 'react';
import logo from './logo.svg';
import './App.css';

import { sum } from '@example-done/library';

const App: React.FC = () => {
  const a = 10;
  const b = 25;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {`${a} + ${b} = ${sum(a, b)}`}
        </p>
      </header>
    </div>
  );
}

export default App;
