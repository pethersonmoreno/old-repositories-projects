import React, { Component } from 'react';
import './CubeExample.css';
import CanvasCube from './CanvasCube';

const getDiffPixelsInRadians = pixels => pixels / 800.0;

const getPosFromTouch = touch => ({
  x: touch.clientX,
  y: touch.clientY,
});
const getPosFromMouseEvent = event => ({
  x: event.clientX,
  y: event.clientY,
});
class CubeExample extends Component {
  state = {
    rotationX: 0.0,
    rotationY: 0.7,
    rotationZ: 1.0,
    pos: null,
  };
  onTouchStart = e => {
    this.setState({
      pos: getPosFromTouch(e.touches[0]),
    });
  };

  onTouchMove = e => {
    if (!e.changedTouches || !e.changedTouches.length) {
      return;
    }
    this.onUpdatePos(getPosFromTouch(e.changedTouches[0]));
  };

  onTouchEnd = e => {
    this.setState({
      pos: null,
    });
  };

  onMouseDown = e => {
    this.setState({
      pos: getPosFromMouseEvent(e),
    });
  };

  onMouseMove = e => {
    this.onUpdatePos(getPosFromMouseEvent(e));
  };

  onMouseUp = e => {
    console.log(e);
    this.setState({
      pos: null,
    });
  };

  onMouseOut = e => {
    this.setState({
      pos: null,
    });
  };

  onUpdatePos = newPos =>
    this.setState(state => {
      const { pos, rotationX, rotationY } = this.state;
      if (!pos) {
        return state;
      }
      const newRotationX =
        rotationX + -getDiffPixelsInRadians(pos.x - newPos.x);
      const newRotationY =
        rotationY + -getDiffPixelsInRadians(pos.y - newPos.y);
      return {
        rotationX: newRotationX,
        rotationY: newRotationY,
        pos: newPos,
      };
    });

  render() {
    const { rotationX, rotationY, rotationZ } = this.state;
    return (
      <div className="page">
        <h1>Cube Example</h1>
        <div
          className="containerCanvas"
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onMouseOut={this.onMouseOut}
        >
          >
          <CanvasCube
            rotationX={rotationX}
            rotationY={rotationY}
            rotationZ={rotationZ}
          />
        </div>
        <p>
          <span>Rotation X in radians: </span>
          <input
            type="number"
            step={0.01}
            value={rotationX}
            onChange={event => this.setState({ rotationX: event.target.value })}
          />
        </p>
        <p>
          <span>Rotation Y in radians: </span>
          <input
            type="number"
            step={0.01}
            value={rotationY}
            onChange={event => this.setState({ rotationY: event.target.value })}
          />
        </p>
        <p>
          <span>Rotation Z in radians: </span>
          <input
            type="number"
            step={0.01}
            value={rotationZ}
            onChange={event => this.setState({ rotationZ: event.target.value })}
          />
        </p>
        <p>Source Code:</p>
        <ul>
          <li>
            <a href="https://github.com/pethersonmoreno/webgl-analytical-geometry/tree/feature/first-webgl-with-react/src/pages/CubeExample">
              CubeExample
            </a>
          </li>
        </ul>
        <p>Done based on:</p>
        <ul>
          <li>
            <a href="https://mdn.github.io/webgl-examples/tutorial/sample5/index.html">
              Sample 5 of webgl-examples
            </a>
          </li>
          <li>
            <a href="https://github.com/mdn/webgl-examples/tree/gh-pages/tutorial/sample5">
              Source Code of Sample 5 of webgl-examples
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default CubeExample;
