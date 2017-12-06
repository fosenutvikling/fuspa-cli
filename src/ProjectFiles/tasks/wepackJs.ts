export const webpackJs = (mainFile, output) =>
  `
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
  
module.exports = {
  entry: '${mainFile}',
  output: {
    filename: '${output}'
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [
        { loader: 'cache-loader' },
        {
          loader: 'thread-loader',
          options: {
          // there should be 1 cpu for the fork-ts-checker-webpack-plugin
          workers: require('os').cpus().length - 1,
        },
      },
      {
        loader: 'ts-loader',
        options: {
          happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
        }
      }
    ]
    }]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    new UglifyJsPlugin({
      sourceMap: true
    })
  ]
};
`;