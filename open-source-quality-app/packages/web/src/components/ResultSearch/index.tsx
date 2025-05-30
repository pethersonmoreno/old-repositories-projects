import React from 'react';
import LineChart from '../LineChart';
import ResultSearchTable from '../ResultSearchTable';
import './style.scss';

function ResultSearch() {
  return (
    <div className="result-search">
      <LineChart data={[]} />
      <ResultSearchTable />
    </div>
  );
}

export default ResultSearch;
