import React from 'react';
import ResultSearch from '../../components/ResultSearch';
import SearchBar from '../../components/SearchBar';
import './style.scss';

function HomeComparationPage() {
  return (
    <div className="home-comparation-page">
      <div className="__content">
        <SearchBar />
        <ResultSearch />
      </div>
    </div>
  );
}

export default HomeComparationPage;
