const path = require('path')
const args = require('minimist')(process.argv.slice(2))
const defaultSettings = require('./cfg/defaults')

// List of allowed environments
const allowedEnvs = ['dev', 'dist', 'test']

// Set the correct environment
let env
if (args._.length > 0 && args._.indexOf('start') !== -1) {
    env = 'test'
} else if (args.env) {
    env = args.env
} else {
    env = 'dev'
}
process.env.REACT_WEBPACK_ENV = env

// 待演示demo的组件
const component = args.component

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig(wantedEnv) {
    const isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1
    const validEnv = isValid ? wantedEnv : 'dev'
    const config = require(path.join(__dirname, 'cfg/' + validEnv))

    if (wantedEnv === 'dev') {
        const entry = {
            index: [
                'webpack-dev-server/client?http://localhost:' + defaultSettings.port,
                'webpack/hot/only-dev-server',
                './components/' + component + '/demo/index',
            ],
        }
        return Object.assign({}, config, { entry })
    }
    return config
}

module.exports = buildConfig(env)
