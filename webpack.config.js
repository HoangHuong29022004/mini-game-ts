const path = require('path');

module.exports = {
    mode: "production",

    entry: {
        main: "./src/frontend/App.ts",
        user: "./src/frontend/UserApp.ts"
    },

    output:{
        filename: "[name].bundle.js",
        chunkFilename: '[id].bundle.js',
        path: path.resolve(__dirname, "dist/frontend"),
        publicPath: "/assets/"
    },

    devtool: "source-map",

    resolve:{
        extensions: [".ts", ".js", ".tsx"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }

}