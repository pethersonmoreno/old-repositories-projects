const paths = require('./paths');
const createBaseConfig = require('./webpackDevServer.config');
const extendConfigFn = require(paths.appPath + '/webpackDevServer.config.extend.js')

module.exports = function(proxy, allowedHost) {
    const baseConfig = createBaseConfig(proxy, allowedHost)
    return extendConfigFn(baseConfig, process.env.NODE_ENV, { paths })
}
