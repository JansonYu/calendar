const path = require('path')

const defaultSettings = require('./defaults')

module.exports = {
    output: {
        path: path.join(__dirname, '/../dist/'),
        filename: '[name].js',
        publicPath: `.${defaultSettings.publicPath}`,
        libraryTarget: 'umd',
    },
    devServer: {
        contentBase: './demo/',
        historyApiFallback: true,
        hot: true,
        port: defaultSettings.port,
        publicPath: defaultSettings.publicPath,
        noInfo: false,
    },
    module: {},
    resolve: {
        enforceExtension: false,
        extensions: ['.js', '.jsx'],
    },
}
