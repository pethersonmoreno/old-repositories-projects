import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Box = ({
  children, center, fill, flex
}) => (
  <div className={classnames('box', {
    'box-center': center,
    'box-fill': fill,
    'box-flex': flex,
  })}
  >
    <div className="box_container">
      {children}
    </div>
  </div>
);
Box.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  center: PropTypes.bool,
  fill: PropTypes.bool,
  flex: PropTypes.bool,
};
Box.defaultProps = {
  center: false,
  fill: false,
  flex: false,
};

export default Box;
