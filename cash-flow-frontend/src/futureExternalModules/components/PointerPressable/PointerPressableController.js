/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import usePointerPressable from '../../hooks/usePointerPressable';
import PointerPressableView from './PointerPressableView';

const PointerPressableController = ({
  children,
  longPressTime,
  onShortPress,
  onLongPress,
  disableSelectText
}) => {
  const pressable = usePointerPressable({
    ...children.props,
    longPressTime,
    onShortPress,
    onLongPress
  });
  return (
    <PointerPressableView
      onPointerDown={pressable.onPointerDown}
      onPointerUp={pressable.onPointerUp}
      onPointerMove={pressable.onPointerMove}
      onPointerLeave={pressable.onPointerLeave}
      disableSelectText={disableSelectText}
    >
      {children}
    </PointerPressableView>
  );
};
PointerPressableController.propTypes = {
  children: PropTypes.node.isRequired,
  longPressTime: PropTypes.number,
  onShortPress: PropTypes.func,
  onLongPress: PropTypes.func,
  disableSelectText: PropTypes.bool,
};
PointerPressableController.defaultProps = {
  longPressTime: 500,
  onShortPress: null,
  onLongPress: null,
  disableSelectText: true,
};

export default PointerPressableController;
