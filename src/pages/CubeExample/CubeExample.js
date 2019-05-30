import React, { Component } from "react";
import "./CubeExample.css";
import CanvasCube from "./CanvasCube";

class CubeExample extends Component {
  state = {
    rotationX: 0.0,
    rotationY: 0.7,
    rotationZ: 1.0
  };
  render() {
    const { rotationX, rotationY, rotationZ } = this.state;
    return (
      <div className="page">
        <h1>Cube Example</h1>
        <div className="containerCanvas">
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
        <p>
          Source Code:
          <ul>
            <li>
              <a href="https://github.com/pethersonmoreno/webgl-analytical-geometry/tree/feature/first-webgl-with-react/src/pages/CubeExample">
                CubeExample
              </a>
            </li>
          </ul>
        </p>
        <p>
          Done based on:
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
        </p>
      </div>
    );
  }
}

export default CubeExample;
