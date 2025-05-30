/* eslint-disable func-names */
function Pressable({
  longPressTime,
  onShortPress,
  onLongPress,
  onPressStart,
  onPressEnd,
  onPressCancel,
  onPressMove,
}) {
  this.state = {
    timeoutRunning: null,
    shouldShortPress: false,
    moved: false,
  };
  this.updateParams({
    longPressTime,
    onShortPress,
    onLongPress,
    onPressStart,
    onPressEnd,
    onPressCancel,
    onPressMove
  });
}
Pressable.prototype.updateParams = function (params) {
  this.params = {
    longPressTime: params.longPressTime,
    onShortPress: params.onShortPress,
    onLongPress: params.onLongPress,
    onPressStart: params.onPressStart,
    onPressEnd: params.onPressEnd,
    onPressCancel: params.onPressCancel,
    onPressMove: params.onPressMove,
  };
};
Pressable.prototype.setState = function (stateUpdates) {
  Object.keys(stateUpdates).forEach(key => {
    this.state[key] = stateUpdates[key];
  });
};
Pressable.prototype.longPressed = function () {
  this.setState({ shouldShortPress: false });
  if (this.params.onLongPress && !this.state.moved) {
    this.params.onLongPress();
  }
};
Pressable.prototype.startTimeout = function () {
  const newTimeout = window.setTimeout(this.longPressed.bind(this), this.params.longPressTime);
  this.setState({ timeoutRunning: newTimeout });
};
Pressable.prototype.cancelTimeout = function () {
  window.clearTimeout(this.state.timeoutRunning);
  this.setState({ timeoutRunning: null });
};
Pressable.prototype.onPressStart = function (e) {
  this.setState({ shouldShortPress: true, moved: false });
  this.startTimeout();
  if (typeof this.params.onPressStart === 'function') {
    this.params.onPressStart(e);
  }
};
Pressable.prototype.onPressEnd = function (e) {
  this.cancelTimeout();
  if (this.params.onShortPress && this.state.shouldShortPress && !this.state.moved) {
    this.params.onShortPress();
  }
  if (typeof this.params.onPressEnd === 'function') {
    this.params.onPressEnd(e);
  }
};
Pressable.prototype.onPressCancel = function (e) {
  this.cancelTimeout();
  if (typeof this.params.onPressCancel === 'function') {
    this.params.onPressCancel(e);
  }
};
Pressable.prototype.onPressMove = function (e) {
  this.setState({ moved: true });
  if (typeof this.params.onPressMove === 'function') {
    this.params.onPressMove(e);
  }
};

export default Pressable;
