const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: path.resolve(__dirname, "..", "src", "index.js"),
    externals: ["aws-sdk"],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: [
                        "env"
                    ]
                }
            }
        ]
    },
    output: {
        filename: "bundle.js",
        library: "index",
        libraryTarget: "umd",
        path: path.resolve(__dirname, "../dist")
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: false
        })
    ],
    target: "node"
};
