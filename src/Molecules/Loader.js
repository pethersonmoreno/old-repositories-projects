import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withLoading } from 'HOC/withAsyncOperation';

const styles = () => ({
  loading: {
    position: 'absolute',
    zIndex: 1300,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  loadingSize: {
    position: 'absolute',
    zIndex: 1301,
  },
  loadingSpinner: {
    color: '#5f71c5',
  },
});
const Menu = ({ classes, sidesDistance, loading }) => (
  <div className={classes.loading} style={{ display: loading ? 'block' : 'none' }}>
    <div
      className={classes.loadingSize}
      style={{
        top: sidesDistance,
        right: sidesDistance,
        left: sidesDistance,
        bottom: sidesDistance,
      }}
    >
      <CircularProgress className={classes.loadingSpinner} size="auto" />
    </div>
  </div>
);
Menu.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  sidesDistance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  loading: PropTypes.bool.isRequired,
};
Menu.defaultProps = {
  sidesDistance: '35%',
};
export default compose(
  withLoading(),
  withStyles(styles),
)(Menu);
