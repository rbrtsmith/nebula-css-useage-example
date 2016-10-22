import webpack from 'webpack';
import path from 'path';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import merge from 'webpack-merge';

const common = {
  entry: {
    start: path.join(__dirname, '/src/js/start.js'),
    main: path.join(__dirname, '/src/js/main.js')
  },
  output: {
    path: path.join(__dirname,'dist'),
    filename: '[name]-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader?sourceMap!', 'sass'])
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/nebula-css'),
    ],
  },
  resolve: {
    extensions: ['', '.js', '.json', 'scss']
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ]
};

const development = {
  devtool: 'source-map',
  watch: true,
  plugins: [
    new LiveReloadPlugin()
  ]
};

const production = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
  ]
};

const config = environment => {
  switch (environment) {
    case 'build':
      return merge(common, production);
    case 'start':
      return merge(common, development);
    default:
      return common;
  }
};

export default config(process.env.npm_lifecycle_event);
