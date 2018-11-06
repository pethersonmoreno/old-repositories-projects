import React from 'react';
const navigateTo = (props, path) => {
  const { history } = props;
  return history.push(path);
}

export default () => 
    Component => {
      const newComponent = props => <Component {...props} navigateTo={navigateTo.bind(null, props)} />;
      return newComponent;
    };