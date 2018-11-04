import React from 'react';

const ButtonFabContainer = 
  props => 
    <div className='fabContainer' {...props}>
      {props.children}
    </div>;

export default ButtonFabContainer;