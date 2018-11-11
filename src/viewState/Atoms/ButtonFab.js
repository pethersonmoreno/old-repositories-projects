import React from 'react';
import Button from '@material-ui/core/Button';

const ButtonFab = ({ children, ...otherProps }) => (
  <Button variant="fab" className="fab" color="primary" {...otherProps}>
    {children}
  </Button>
);
export default ButtonFab;
