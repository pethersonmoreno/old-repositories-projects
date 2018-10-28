/**
 * Project's customized Webpack Configuration Extension
 * ----------------------------------------------------
 *
 * this file is heavily inspired by `react-app-rewired` mechanism.
 *
 * it simply gives you the chance to hook into the default Webpack
 * configuration as it is provided by `create-react-app`, and to
 * change it so to match your project's needs.
 *
 * If you want to check out the default values look into:
 * `./node_modules/marcopeg-react-scripts/config/webpack.config.${env}.js`
 *
 */

module.exports = (webpackConfig, env, { paths }) => {
    // here you can extend your webpackConfig at will
    webpackConfig.module.rules.forEach(rule=>{
      if(rule.oneOf !== undefined){
        rule.oneOf.forEach(oneOf=>{
          if(oneOf.options !== undefined 
            && oneOf.options.plugins !== undefined
            && oneOf.test !== undefined
            && '.js'.match(oneOf.test)
            && '.jsx'.match(oneOf.test)
          ){
            oneOf.options.plugins.push(
              ["@babel/plugin-proposal-export-default-from"]
            );
          }
        })
      }
    });
    return webpackConfig
}
