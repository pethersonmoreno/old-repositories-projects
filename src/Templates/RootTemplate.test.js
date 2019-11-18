import React from 'react';
import ReactDOM from 'react-dom';
import RootTemplate from './RootTemplate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RootTemplate />, div);
  ReactDOM.unmountComponentAtNode(div);
});
