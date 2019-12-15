import { useState, useCallback } from 'react';

const useTouchPressable = ({
  time, onPress, onLongPress,
  onTouchStart: onTouchStartParam,
  onTouchEnd: onTouchEndParam,
  onTouchCancel: onTouchCancelParam,
  onTouchMove: onTouchMoveParam,
}) => {
  const [timeout, setTimeout] = useState(null);
  const [shouldShortPress, setShouldShortPress] = useState(false);
  const [moved, setMoved] = useState(false);
  const longPressed = useCallback(() => {
    setShouldShortPress(false);
    if (onLongPress && !moved) {
      onLongPress();
    }
  }, [onLongPress, moved]);
  const startTimeout = useCallback(() => {
    const newTimeout = window.setTimeout(longPressed, time);
    setTimeout(newTimeout);
  }, [longPressed, time]);
  const cancelTimeout = useCallback(() => {
    window.clearTimeout(timeout);
    setTimeout(null);
  }, [timeout]);
  const onTouchStart = e => {
    setShouldShortPress(true);
    setMoved(false);
    startTimeout();
    if (typeof onTouchStartParam === 'function') {
      onTouchStartParam(e);
    }
  };
  const onTouchEnd = e => {
    cancelTimeout();
    if (onPress && shouldShortPress && !moved) {
      onPress();
    }
    if (typeof onTouchEndParam === 'function') {
      onTouchEndParam(e);
    }
  };
  const onTouchCancel = e => {
    cancelTimeout();
    if (typeof onTouchCancelParam === 'function') {
      onTouchCancelParam(e);
    }
  };
  const onTouchMove = e => {
    setMoved(true);
    if (typeof onTouchMoveParam === 'function') {
      onTouchMoveParam(e);
    }
  };
  return {
    onTouchStart, onTouchEnd, onTouchCancel, onTouchMove
  };
};

export default useTouchPressable;
