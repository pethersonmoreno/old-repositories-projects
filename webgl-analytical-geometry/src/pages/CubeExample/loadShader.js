const loadShader = (gl, type, source) => {
    const shader = gl.createShader(type);

    // Send the source to the shader object

    gl.shaderSource(shader, source);

    // Compile the shader program

    gl.compileShader(shader);

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const errorMessage =
            "An error occurred compiling the shaders: " +
            gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(errorMessage);
    }

    return shader;
};

export default loadShader;
