/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import './App.css';
import Divider from './components/Divider';
import IconGithub from './assets/images/logo-github.jpg';
import IconTwitter from './assets/images/logo-twitter.png';
import IconLinkedin from './assets/images/logo-linkedin.png';
import Bubble from './components/Bubble';

function App() {
  return (
    <div className="app">
      <Bubble />
      <h1>I'm Petherson Moreno</h1>
      <Divider />
      <p>
        Front-end developer. Parent of an one-year-old boy.
        {' '}
        Passionate about technologies, learning and teaching a little bit about a lot of things.
      </p>
      <Divider />
      <p>Campinas, São Paulo, Brazil</p>
      <Divider />
      <p>Find me on:</p>
      <div className="social-icons">
        <a href="http://github.com"><img src={IconGithub} alt="Github" /></a>
        <a href="http://twitter.com"><img src={IconTwitter} alt="Twitter" /></a>
        <a href="http://linkedin.com"><img src={IconLinkedin} alt="Linkedin" /></a>
      </div>
    </div>
  );
}

export default App;
