const path = require('path')
const webpack = require('webpack')

const baseConfig = require('./base')
const defaultSettings = require('./defaults')

const plugins = defaultSettings.getDefaultPlugins().concat([
    new webpack.HotModuleReplacementPlugin(),
])
const modules = defaultSettings.getDefaultModules()
modules.rules.push({
    test: /\.(js|jsx)$/,
    use: [
        {
            loader: 'react-hot-loader/webpack',
        },
        {
            loader: 'babel-loader',
            options: {
                presets: ['es2015', 'react'],
                plugins: ['transform-class-properties'],
            },
        },
    ],
    include: [path.join(__dirname, '../components'), path.join(__dirname, '../demo')],
})

const config = Object.assign({}, baseConfig, {
    cache: true,
    devtool: 'eval-source-map',
    plugins,
    module: modules,
})

module.exports = config
