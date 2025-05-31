import loadShader from "./loadShader";

const getTheSourceByid = id => {
    let theSource = "";
    const shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }
    let currentChild = shaderScript.firstChild;

    while (currentChild) {
        if (currentChild.nodeType == currentChild.TEXT_NODE) {
            theSource += currentChild.textContent;
        }

        currentChild = currentChild.nextSibling;
    }
    return theSource;
};
const getTypeById = (gl, id) => {
    const shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }
    if (shaderScript.type === "x-shader/x-fragment") {
        return gl.FRAGMENT_SHADER;
    } else if (shaderScript.type === "x-shader/x-vertex") {
        return gl.VERTEX_SHADER;
    } else {
        throw new Error("Tipo de shader desconhecido");
    }
};

const getShader = (gl, id) => {
    const theSource = getTheSourceByid(id);
    const type = getTypeById(gl, id);
    return loadShader(gl, type, theSource);
};

export default getShader;
