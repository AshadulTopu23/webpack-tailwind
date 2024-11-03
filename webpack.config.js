
'use strict'
const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackSimpleIncludePlugin = require("html-webpack-simple-include-plugin");
const autoprefixer = require('autoprefixer')




const rootDirectory = path.resolve(__dirname, "src");

// Function to generate HtmlWebpackPlugin instances for each HTML file
function generateHtmlPlugins(rootDir) {
    const plugins = [];
    // Read the root directory
    const files = fs.readdirSync(rootDir);

    // Filter HTML Pages files
    const htmlPageFiles = files.filter((file) => path.extname(file) === ".html");
    // Loop through HTML files
    htmlPageFiles.forEach((file) => {
        plugins.push(
            new HtmlWebpackPlugin({
                filename: file,
                template: path.join(rootDir, file), // Fix: Change `directory` to `rootDir`
            })
        );
    });

    return plugins;
}

const htmlFiles = generateHtmlPlugins(rootDirectory);

// partial files
const partialFiles = ['head', 'header', 'loader', 'back-to-top', 'footer',].map((partial) => {
    return {
        tag: `<include-${partial} />`,
        content: fs.readFileSync(path.resolve(__dirname, `src/partials/${partial}.html`))
    }
})

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/index.js',
        clean: true,
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 3000,
        // open: true,
        hot: true,
        liveReload: true,
        watchFiles: ['src/**/*'],
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(sc|sa|c|)ss$/i,
                use: [
                    {
                        // Adds CSS to the DOM by injecting a `<style>` tag
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader: 'css-loader'
                    },
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer]
                            }
                        }
                    },
                    {
                        // Loads a SASS/SCSS file and compiles it to CSS
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,  // Match font files
                type: 'asset/resource',  // Webpack 5 way to handle assets
                generator: {
                    filename: 'assets/fonts/[name][ext]',  // Output to 'assets/fonts'
                },
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|gif|webp)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'assets/images/[name][ext]',
                },
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "assets/css/index.css",
        }),
        new CopyPlugin({
            patterns: [{ from: "src/assets/images", to: "assets/images" }],
        }),
        ...htmlFiles,
        new HtmlWebpackSimpleIncludePlugin([...partialFiles])
    ],
}
