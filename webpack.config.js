const path = require("path");
const Dotenv = require('dotenv-webpack');

const config = {

    entry: {
        index: './src/js/index.js',
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: `chmap-leaflet-layers-panel.js`,
        library: {
            name: "chmapLeafletLayersPanel",
            type: 'umd',
        }
    },

    // Define development options
    devtool: "source-map",

    optimization: {
       splitChunks: {
            chunks: 'async'
        }
    },

    performance: {
        hints: false,
    },

    // Define loaders
    module: {
        rules: [
            // Use babel for JS files
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                }
            },
        ],
    },

    plugins: [
        // new webpack.ProvidePlugin({
        //     L: 'leaflet',
        // }),
    ]

};


module.exports = (webpackEnv, argV) => {

    const isProduction = (argV.mode === "production");

    const dotenvCfg =  { path: "./.env_dev" };

    if (isProduction) {
        config.performance.hints = 'warning';
        dotenvCfg.path = "./.env_prd";
    }

    // Load .env_dev file for environment variables in JS
    config.plugins.push(new Dotenv(dotenvCfg))

    return config;
};
