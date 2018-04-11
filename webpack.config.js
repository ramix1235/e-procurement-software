/* eslint-disable */

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const publicPath = '/public/assets';
const cssName = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';
const jsName = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER: JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new ExtractTextPlugin(cssName),
  new AssetsPlugin({
    filename: 'assets.json',
    path: path.join(__dirname, publicPath),
    fullPath: false
  }),
  new webpack.LoaderOptionsPlugin({
    debug: process.env.NODE_ENV !== 'production',
    options: {
      eslint: { configFile: path.join(__dirname, '.eslintrc') }
    }
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin()
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new CleanWebpackPlugin(['public/assets/'], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  );
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}

module.exports = {
  stats: { warnings: false },
  entry: ['babel-polyfill', './src/client.js'],
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx']
  },
  plugins,
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: jsName
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          // "eslint-loader",
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: './postcss.config.js',
            }],
        }),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: './postcss.config.js',
            },
            'less-loader',
          ],
        }),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: './postcss.config.js',
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        loader: process.env.NODE_ENV !== 'production' ? 'babel-loader!eslint-loader' : 'babel-loader',
        exclude: [/node_modules/, /public/]
      }
    ]
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : 'cheap-eval-source-map',
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: 'errors-only'
  }
};
