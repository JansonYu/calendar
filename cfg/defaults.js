const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const componentsPath = path.join(__dirname, '/../components')
const dfltPort = 8000

function getDefaultModules() {
    return {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [componentsPath],
                loader: 'eslint-loader',
                enforce: 'pre',
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                    publicPath: './',
                }),
            },
            {
                test: /\.less$/,
                include: [componentsPath],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?modules&importLoaders=1&localIdentName=sunl__[local]', 'less-loader'],
                    publicPath: './',
                }),
            },
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
        ],
    }
}

const getDefaultPlugins = () => [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    // new webpack.optimize.UglifyJsPlugin(),
]

module.exports = {
    componentsPath,
    port: dfltPort,
    getDefaultModules,
    getDefaultPlugins,
}
