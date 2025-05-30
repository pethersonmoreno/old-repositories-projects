import usePressable from './usePressable';

const useTouchPressable = ({
  longPressTime,
  onShortPress,
  onLongPress,
  onTouchStart: onTouchStartParam,
  onTouchEnd: onTouchEndParam,
  onTouchCancel: onTouchCancelParam,
  onTouchMove: onTouchMoveParam,
}) => {
  const {
    onPressStart: onTouchStart,
    onPressEnd: onTouchEnd,
    onPressCancel: onTouchCancel,
    onPressMove: onTouchMove
  } = usePressable({
    longPressTime,
    onShortPress,
    onLongPress,
    onPressStart: onTouchStartParam,
    onPressEnd: onTouchEndParam,
    onPressCancel: onTouchCancelParam,
    onPressMove: onTouchMoveParam,
  });
  return {
    onTouchStart, onTouchEnd, onTouchCancel, onTouchMove
  };
};

export default useTouchPressable;
