import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeComparationPage from '../pages/HomeComparationPage';
import Header from './components/Header';
import './App.scss';
import NotFound from '../pages/NotFound';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app-content">
          <div className="__content">
            <Switch>
              <Route path="/" exact>
                <HomeComparationPage />
              </Route>
              <Route path="/compare/:slug" exact>
                <HomeComparationPage />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
