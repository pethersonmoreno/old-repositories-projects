/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Text } from 'grommet';
import { withRouter } from 'react-router-dom';


const SidebarButton = ({
  label, onClick, to, history, ...otherProps
}) => (
  <Button plain fill="horizontal" onClick={to ? () => history.push(to) : onClick} {...otherProps}>
    {({ hover }) => (
      <Box
        background={hover ? 'accent-3' : undefined}
        pad={{ horizontal: 'large', vertical: 'medium' }}
      >
        <Text size="large">{label}</Text>
      </Box>
    )}
  </Button>
);

SidebarButton.propTypes = {
  label: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func
};
SidebarButton.defaultProps = {
  to: '',
  onClick: undefined,
};

export default withRouter(SidebarButton);
