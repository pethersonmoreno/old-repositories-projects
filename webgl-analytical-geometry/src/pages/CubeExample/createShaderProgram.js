import loadShader from "./loadShader";
import vsSource from "./vsSource";
import fsSource from "./fsSource";

const createShaderProgram = gl => {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        throw new Error(
            "Unable to initialize the shader program: " +
                gl.getProgramInfoLog(shaderProgram)
        );
    }

    return shaderProgram;
};

export default createShaderProgram;
