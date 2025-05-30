import React from 'react';
import './style.scss';

type TLineChartProps = {
  data: Array<{
    date: string;
    qtdAllIssues: number;
    qtdAllOpenIssues: number;
    qtdClosedIssuesAtDate: number;
  }>;
};

function LineChart({ data }: TLineChartProps) {
  return <div></div>;
}

export default LineChart;
