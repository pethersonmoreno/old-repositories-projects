/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import useTouchPressable from '../../hooks/useTouchPressable';
import TouchPressableView from './TouchPressableView';

const TouchPressableController = ({
  children,
  longPressTime,
  onPress,
  onLongPress,
  disableSelectText
}) => {
  const pressable = useTouchPressable({
    ...children.props,
    longPressTime,
    onPress,
    onLongPress
  });
  return (
    <TouchPressableView
      onTouchStart={pressable.onTouchStart}
      onTouchEnd={pressable.onTouchEnd}
      onTouchMove={pressable.onTouchMove}
      onTouchCancel={pressable.onTouchCancel}
      disableSelectText={disableSelectText}
    >
      {children}
    </TouchPressableView>
  );
};
TouchPressableController.propTypes = {
  children: PropTypes.node.isRequired,
  longPressTime: PropTypes.number,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  disableSelectText: PropTypes.bool,
};
TouchPressableController.defaultProps = {
  longPressTime: 500,
  onPress: null,
  onLongPress: null,
  disableSelectText: false,
};

export default TouchPressableController;
