import React from 'react';
import AppContentWithMenuButton from '../../../common/AppContentWithMenuButton';


const NotFound = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <AppContentWithMenuButton {...props} title="Page not found">
    <div>
      <h1>Cash Flow</h1>
      <h2 level={2}>Page not found</h2>
    </div>
  </AppContentWithMenuButton>
);


export default NotFound;
