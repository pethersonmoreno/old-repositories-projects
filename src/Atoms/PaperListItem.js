import React from 'react';
import PropTypes from 'prop-types';
import { Paper, ListItem, withStyles } from '@material-ui/core';

const styles = () => ({
  paperListItem: {
    backgroundColor: '#fff',
    '& > div, & > li': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      boxSizing: 'border-box',
      padding: '12px 16px',
      margin: '4px 0',
      boxShadow: '1px 1px 1px 0px rgba(0, 0, 0, 0.2)',
      borderRadius: '7%',
      '& > .content': {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
      },
      '& > .contentRight': {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
      },
    },
  },
});
const PaperListItem = ({
  classes, children, className, ...otherProps
}) => (
  <Paper className={`paper ${classes.paperListItem}`}>
    <ListItem className={className} {...otherProps}>
      {children}
    </ListItem>
  </Paper>
);
PaperListItem.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default withStyles(styles, { withTheme: true })(PaperListItem);
