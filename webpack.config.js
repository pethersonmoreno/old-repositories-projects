const path = require("path");
const slsw = require("serverless-webpack");

module.exports = {
    entry: slsw.lib.entries,
    target: "node",
    output: {
        libraryTarget: "commonjs2",
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    }
};
