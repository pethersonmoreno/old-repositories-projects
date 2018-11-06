import React from 'react';

const ButtonFabContainer = ({children, ...otherProps}) => (
  <div className='fabContainer' {...otherProps}>
    {children}
  </div>
);
export default ButtonFabContainer;