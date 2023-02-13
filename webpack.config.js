const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./src/index.js",
    target: "node",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    externals: [
        {
            nock: "commonjs2 nock",
            "mock-aws-s3": "commonjs2 mock-aws-s3",
            "node-pre-gyp": "node-pre-gyp",
        },
    ],
    devtool: false,
};
