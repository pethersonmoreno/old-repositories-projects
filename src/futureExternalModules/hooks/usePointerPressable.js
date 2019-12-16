import usePressable from './usePressable';

const usePointerPressable = ({
  longPressTime,
  onShortPress,
  onLongPress,
  onPointerDown: onPointerDownParam,
  onPointerUp: onPointerUpParam,
  onPointerLeave: onPointerLeaveParam,
  onPointerMove: onPointerMoveParam,
}) => {
  const {
    onPressStart: onPointerDown,
    onPressEnd: onPointerUp,
    onPressCancel: onPointerLeave,
    onPressMove: onPointerMove
  } = usePressable({
    longPressTime,
    onShortPress,
    onLongPress,
    onPressStart: onPointerDownParam,
    onPressEnd: onPointerUpParam,
    onPressCancel: onPointerLeaveParam,
    onPressMove: onPointerMoveParam,
  });
  return {
    onPointerDown, onPointerUp, onPointerLeave, onPointerMove
  };
};

export default usePointerPressable;
