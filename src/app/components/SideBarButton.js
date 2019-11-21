/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Text } from 'grommet';


const SidebarButton = ({ label, ...otherProps }) => (
  <Button plain fill="horizontal" {...otherProps}>
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
};

export default SidebarButton;
