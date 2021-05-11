const path = require('path');
const toCss = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    "bundle": "./src/app.js",
    "bundle.min": "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: "js/main.min.js"
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          toCss.loader,
          'css-loader?url=false',
          'sass-loader',
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }

    ]
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({}),
      new UglifyJsPlugin({
        include: /\.min\.js$/
      })
    ],
  },
  plugins: [
    new toCss({
      filename: 'css/style.css'
    }),
  ],
  devServer: {
    overlay: true,
    port: 5005
  }
};
