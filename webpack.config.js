// Generated using webpack-cli https://github.com/webpack/webpack-cli
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CssnanoPlugin = require('cssnano-webpack-plugin');
const {extendDefaultPlugins} = require("svgo");

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            inject: true
        });
    });
}

const htmlPlugins = generateHtmlPlugins('./src/html/views');

const config = {
    target: ['web', 'es5'],
    // entry: ['babel-polyfill', './src/js/index.js', './src/scss/style.scss'],
    entry: {
        polyfills: 'babel-polyfill',
        bundle: './src/js/index.js',
        style: './src/scss/style.scss'
    },
    output: {
        clean: true,
        path: path.resolve(__dirname, 'dist/'),
        filename: './js/[name].bundle.js',
    },
    devtool: 'source-map',
    mode: 'production',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                extractComments: true
            }),
            new CssMinimizerPlugin(),
        ],
        minimize: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: [
                    // path.resolve(__dirname, "node_modules/swiper"),
                    // path.resolve(__dirname, "node_modules/dom7"),
                    // path.resolve(__dirname, "node_modules/ssr-window"),
                    path.resolve(__dirname, "src/"),
                ],
                // use: [{
                //     loader: 'babel-loader',
                //     options: {
                //         presets: [
                //             [
                //                 "@babel/preset-env",
                //                 {
                //                     corejs : {
                //                         version : "3",
                //                         proposals : true
                //                     },
                //                     useBuiltIns: 'entry',
                //                     targets: {
                //                         browsers: [
                //                             "edge >= 16",
                //                             "safari >= 10",
                //                             "firefox >= 57",
                //                             "ie > 11",
                //                             "ios >= 10",
                //                             "chrome >= 49"
                //                         ]
                //                     }
                //                 }
                //             ]
                //         ],
                //         plugins: [
                //             ["@babel/plugin-syntax-dynamic-import"],
                //             ["@babel/plugin-proposal-json-strings"],
                //             ["@babel/plugin-transform-classes"],
                //             ["@babel/plugin-transform-arrow-functions"],
                //             ["@babel/plugin-transform-runtime"],
                //             ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
                //             ["@babel/plugin-syntax-class-properties"],
                //             ["@babel/plugin-transform-template-literals"],
                //             ["@babel/plugin-proposal-class-properties", { loose: true }]
                //         ]
                //     }
                // }]
            },
            {
                test: /.s?css$/,
                include: path.resolve(__dirname, 'src/scss'),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            url: false
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false,
                            postcssOptions: {
                                plugins: [
                                    [
                                        'autoprefixer',
                                        {
                                            overrideBrowserslist: [
                                                "edge >= 16",
                                                "safari >= 10",
                                                "firefox >= 57",
                                                "ie > 11",
                                                "ios >= 10",
                                                "chrome >= 49"
                                            ]
                                        }
                                    ]
                                ]
                            }
                        },
                    },
                ]
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, 'src/html/includes'),
                use: ['raw-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset",
            }
        ]
    },
    resolve: {
        alias: {
            $: path.resolve('node_modules', 'jquery/src/jquery'),
            jquery: path.resolve('node_modules', 'jquery/src/jquery'),
            'inputmask': path.resolve('node_modules', 'inputmask/dist/jquery.inputmask')
        }
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
        new MiniCssExtractPlugin({
            filename: './css/style.bundle.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/fonts',
                    to: './fonts'
                },
                {
                    from: './src/favicon',
                    to: './favicon'
                },
                {
                    from: './src/img',
                    to: './img'
                },
            ]
        }),
        new CompressionPlugin({
            test: /\.js(\?.*)?$/i,
        }),
        // new ImageMinimizerPlugin({
        //   minimizerOptions: {
        //     // Lossless optimization with custom option
        //     // Feel free to experiment with options for better result for you
        //     aplugins: [
        //       ["gifsicle", { interlaced: true }],
        //       ["jpegtran", { progressive: true }],
        //       ["optipng", { optimizationLevel: 5 }],
        //       // Svgo configuration here https://github.com/svg/svgo#configuration
        //       [
        //         "svgo",
        //         {
        //           aplugins: extendDefaultPlugins([
        //             {
        //               name: "removeViewBox",
        //               active: false,
        //             },
        //             {
        //               name: "addAttributesToSVGElement",
        //               params: {
        //                 attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
        //               },
        //             },
        //           ]),
        //         },
        //       ],
        //     ],
        //   },
        // }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            inputmask: 'inputmask'
        })
    ].concat(htmlPlugins)
};

var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        config.plugins.push(new CleanWebpackPlugin());
    } else {
        config.plugins.push(new LiveReloadPlugin({
            appendScriptTag: false
        }))
    }
    return config;
};
