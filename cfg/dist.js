const path = require('path')
const webpack = require('webpack')

const baseConfig = require('./base')
const defaultSettings = require('./defaults')

const plugins = defaultSettings.getDefaultPlugins().concat([
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
    }),
])
const modules = defaultSettings.getDefaultModules()
modules.rules.push({
    test: /\.(js|jsx)$/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                presets: ['es2015', 'react'],
                plugins: ['transform-class-properties'],
            },
        },
    ],
    include: [path.join(__dirname, '../components'), path.join(__dirname, '../build')],
})

const config = Object.assign({}, baseConfig, {
    entry: {
        sui: [
            './build/entry',
        ],
    },
    cache: false,
    devtool: 'sourcemap',
    plugins,
    module: modules,
})

module.exports = config
