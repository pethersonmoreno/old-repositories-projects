import React from 'react';
const navigateTo = (props, path) => {
  const { history } = props;
  return history.push(path);
}

export default () => 
    Component => 
      props => <Component {...props} navigateTo={navigateTo.bind(null, props)} />;