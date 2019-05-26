import React, { Component } from "react";
import "./CubeExample.css";
import createShaderProgram from "./createShaderProgram";
import drawScene from "./drawScene";
import initBuffers from "./initBuffers";

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
class CubeExample extends Component {
    componentDidMount() {
        const gl = getGl(this.canvas);
        if (!gl) {
            return;
        }
        const shaderProgram = createShaderProgram(gl);
        const programInfo = {
            program: shaderProgram,
            attribLocations: {
                vertexPosition: gl.getAttribLocation(
                    shaderProgram,
                    "aVertexPosition"
                ),
                vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor")
            },
            uniformLocations: {
                projectionMatrix: gl.getUniformLocation(
                    shaderProgram,
                    "uProjectionMatrix"
                ),
                modelViewMatrix: gl.getUniformLocation(
                    shaderProgram,
                    "uModelViewMatrix"
                )
            }
        };
        const buffers = initBuffers(gl);

        var then = 0;

        let cubeRotation = 0.0;
        // Draw the scene repeatedly
        const render = now => {
            now *= 0.001; // convert to seconds
            const deltaTime = now - then;
            then = now;

            cubeRotation = drawScene(
                gl,
                programInfo,
                buffers,
                deltaTime,
                cubeRotation
            );

            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    }
    render() {
        return (
            <div className="page">
                <h1>Cube Example</h1>
                <div className="containerCanvas">
                    <canvas
                        ref={canvas => (this.canvas = canvas)}
                        width="640"
                        height="480"
                    />
                </div>
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
