import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.scss';

type TResultSearchTableProps = {};

const defaultProjects = [
  {
    id: 'facebook/react',
    name: 'React',
    qtdOpenIssues: 512,
    avgTimeCloseIssues: 80,
    stdDeviationTimeCloseIssues: 10,
  },
  {
    id: 'google/angular',
    name: 'Angular',
    qtdOpenIssues: 2694,
    avgTimeCloseIssues: 300,
    stdDeviationTimeCloseIssues: 20,
  },
];
type TResultSearchTableParams = {
  slug?: string;
};

function ResultSearchTable(props: TResultSearchTableProps) {
  const { slug } = useParams() as TResultSearchTableParams;
  const [projects, setProjects] = useState(defaultProjects);
  if (!slug) {
    return null;
  }
  return (
    <div className="result-search-table">
      <div className="__row-header">
        <div className="__cell --index"> </div>
        <div className="__cell --name"> </div>
        <div className="__cell">#issues</div>
        <div className="__cell">Avg age</div>
        <div className="__cell">Std age</div>
      </div>
      {projects.map((project, index) => (
        <div key={project.id} className="__row">
          <div className="__cell --index">{index + 1}</div>
          <div className="__cell --name">{project.name}</div>
          <div className="__cell">{project.qtdOpenIssues}</div>
          <div className="__cell">{project.avgTimeCloseIssues}</div>
          <div className="__cell">{project.stdDeviationTimeCloseIssues}</div>
        </div>
      ))}
    </div>
  );
}

export default ResultSearchTable;
