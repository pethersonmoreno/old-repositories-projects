import React from 'react';
import Button from '@material-ui/core/Button';

const ButtonFab = 
  props => 
    <Button variant="fab" className='fab' color='primary'
      {...props}>
      {props.children}
    </Button>;

export default ButtonFab;