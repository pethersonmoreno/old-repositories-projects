import React from 'react';
import { Link } from 'react-router-dom';
import ButtonLearnMore from './components/ButtonLearnMore';
import './Header.scss';

function Header() {
  return (
    <header className="app-header">
      <div className="__content">
        <h1 className="__app-name">
          <Link to="/">LibQuality</Link>
        </h1>
        <p className="__app-description">
          This is a simple tool to compare quality of different open source libraries available in GitHub.
        </p>
        <ButtonLearnMore
          label="Learn More"
          onClick={() => {
            window.location.href = 'https://github.com/pethersonmoreno/open-source-quality-app';
          }}
        />
      </div>
    </header>
  );
}

export default Header;
