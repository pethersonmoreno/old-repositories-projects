import { useRef } from 'react';
import Pressable from '../helpers/Pressable';

const usePressable = ({
  longPressTime,
  onShortPress,
  onLongPress,
  onPressStart: onPressStartParam,
  onPressEnd: onPressEndParam,
  onPressCancel: onPressCancelParam,
  onPressMove: onPressMoveParam,
}) => {
  const pressableParams = {
    longPressTime,
    onShortPress,
    onLongPress,
    onPressStart: onPressStartParam,
    onPressEnd: onPressEndParam,
    onPressCancel: onPressCancelParam,
    onPressMove: onPressMoveParam,
  };
  const { current: pressable } = useRef(new Pressable(pressableParams));
  pressable.updateParams(pressableParams);
  return {
    onPressStart: pressable.onPressStart.bind(pressable),
    onPressEnd: pressable.onPressEnd.bind(pressable),
    onPressCancel: pressable.onPressCancel.bind(pressable),
    onPressMove: pressable.onPressMove.bind(pressable)
  };
};

export default usePressable;
