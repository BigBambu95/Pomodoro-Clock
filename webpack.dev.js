const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        overlay: true,
        hot: true,
        open: true,
        historyApiFallback: true
    },
    devtool: 'inline-source-map',
});