import React, { Component } from "react";
import PropTypes from "prop-types";
import createShaderProgram from "./createShaderProgram";
import initBuffers from "./initBuffers";
import drawScene from "./drawScene";

const getGl = canvas => {
  const gl = canvas.getContext("webgl");
  // Só continua se o WebGL estiver disponível e funcionando
  if (!gl) {
    alert(
      "Incapaz de inicializar o WebGL.Seu navegador ou sua máquina não suporta."
    );
    return;
  }
  return gl;
};
const createProgramInfo = gl => {
  const shaderProgram = createShaderProgram(gl);
  return {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor")
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix"
      ),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix")
    }
  };
};
const hasPropsChanged = (props, prevProps, namesOfProps) =>
  !!namesOfProps.find(propName => props[propName] !== prevProps);

class CanvasCube extends Component {
  componentDidMount() {
    this.gl = getGl(this.canvas);
    if (!this.gl) {
      return;
    }
    this.programInfo = createProgramInfo(this.gl);
    this.buffers = initBuffers(this.gl);

    requestAnimationFrame(this.renderCanvas);
  }
  componentDidUpdate(prevProps) {
    if (!this.gl) {
      return;
    }
    const propsCompare = ["rotationX", "rotationY", "rotationZ"];
    if (hasPropsChanged(this.props, prevProps, propsCompare)) {
      requestAnimationFrame(this.renderCanvas);
    }
  }
  renderCanvas = () => {
    const { rotationX, rotationY, rotationZ } = this.props;
    drawScene(
      this.gl,
      this.programInfo,
      this.buffers,
      rotationX,
      rotationY,
      rotationZ
    );
  };
  render() {
    return (
      <canvas ref={canvas => (this.canvas = canvas)} width="640" height="480" />
    );
  }
}
CanvasCube.propTypes = {
  rotationX: PropTypes.number.isRequired,
  rotationY: PropTypes.number.isRequired,
  rotationZ: PropTypes.number.isRequired
};

export default CanvasCube;
