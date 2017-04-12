const path = require('path');

module.exports = {
    entry: './modules/game/web_game',
    output: {
        path: path.join(__dirname, './build/'),
        filename: 'build.js',
    },
    watch: true,
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
    devtool: 'source-map',
};
