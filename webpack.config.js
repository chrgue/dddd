const path = require('path');
const fs = require('fs');
const WebpackAssetsManifest = require('webpack-assets-manifest');


const entry = fs.readdirSync(path.join(__dirname, 'src', 'api'))
    .reduce((prev, curr) => {
        prev[curr.split('.').slice(0, -1).join('.')] = './src/api/' + curr;
        return prev
    }, {});

module.exports = {
    entry,
    output: {
        filename: '[name]-[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
            {test: /\.([cm]?ts|tsx)$/, loader: "ts-loader"}
        ]
    },
    plugins: [
        new WebpackAssetsManifest({entrypoints: true})
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 1
        },
    },
};