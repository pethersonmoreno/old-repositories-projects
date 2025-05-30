import { cloneElement } from 'react';
import PropTypes from 'prop-types';
import newStyleWithSelectTextDisabled from '../../helpers/newStyleWithSelectTextDisabled';

const PointerPressableView = ({
  children,
  onPointerDown,
  onPointerUp,
  onPointerMove,
  onPointerLeave,
  disableSelectText,
}) => {
  let { style } = children.props;
  if (disableSelectText) {
    style = newStyleWithSelectTextDisabled(style);
  }
  return cloneElement(children, {
    ...children.props,
    style,
    onContextMenu: e => e.preventDefault(),
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onPointerLeave,
  });
};

PointerPressableView.propTypes = {
  children: PropTypes.node.isRequired,
  onPointerDown: PropTypes.func.isRequired,
  onPointerUp: PropTypes.func.isRequired,
  onPointerMove: PropTypes.func.isRequired,
  onPointerLeave: PropTypes.func.isRequired,
  disableSelectText: PropTypes.bool.isRequired,
};
export default PointerPressableView;
