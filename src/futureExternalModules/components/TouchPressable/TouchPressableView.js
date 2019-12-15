import React, { useState, useCallback } from 'react';

const isTouch =() => {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
}
const usePressable = ({ time, onLongPress})=>{
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
};

onTouchStart = e => {
  this.shouldShortPress = true;
  this.moved = false;
  this.startTimeout();
  if (typeof this.props.onTouchStart === 'function') {
    this.props.onTouchStart(e);
  }
};

onTouchEnd = e => {
  this.cancelTimeout();
  if (this.props.onPress && this.shouldShortPress && this.moved === false) {
    this.props.onPress();
  }
  if (typeof this.props.onTouchEnd === 'function') {
    this.props.onTouchEnd(e);
  }
};

onTouchCancel = e => {
  this.cancelTimeout();
  if (typeof this.props.onTouchCancel === 'function') {
    this.props.onTouchCancel(e);
  }
};

onMove = e => {
  this.moved = true;
  if (typeof this.props.onTouchMove === 'function') {
    this.props.onTouchMove(e);
  }
};

const TouchPressableView = ({children})=>{


  const props = {
    onContextMenu: e => e.preventDefault(),
    onTouchStart: this.onTouchStart,
    onTouchEnd: this.onTouchEnd,
    onTouchMove: this.onMove,
    onTouchCancel: this.onTouchCancel,
    style: {
      ...children.props.style,
      WebkitUserSelect: 'none',
      WebkitTouchCallout: 'none'
    }
  };

  return React.cloneElement(children, { ...children.props, ...props });
}
