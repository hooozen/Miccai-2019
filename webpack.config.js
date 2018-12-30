const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const devMode = process.env.NODE_ENV === 'dev';

function srcPath(dir) {
  dir = dir || '';
  return path.resolve(__dirname, './src', dir);
}

module.exports = {
  mode: 'development',
  entry: {
    main: './main.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'script/[name][hash].js',
  },
  devServer: {
    contentBase: path.resolve('./dist'),
    disableHostCheck: true,
    port: 7777,
  },
  resolve: {
    alias: {
      images: path.resolve('./src/images'),
    },
  },
  module: {
    rules: [{
      test: /\.s?css$/,
      use: [
        devMode ? 'style-loader' : {
          loader: MiniCssExtractPlugin.loader,
          options: { publicPath: '/' },
        },
        { loader: 'css-loader', options: { importLoaders: 1 } },
        'postcss-loader',
        'sass-loader'
      ],
    }, {
      test: /\.(png|jpge?|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: 'images/[name][hash:8].[ext]',
          limit: 8192,
        },
      }],
    }, {
      test: /\.pug$/,
      use: [{
        loader: 'html-loader',
      }, {
        loader: path.resolve('./src/loaders/pug-loader.js'),
        options: {
          basedir: srcPath('layout/'),
          data: {
            navs: [
              { name: 'Home', href: "./" },
              { name: 'Data', href: './data.html' },
              { name: 'Submit', href: './submit.html' },
              { name: 'Evaluate', href: './evaluate.html' },
              { name: 'Result', href: './result.html' },
            ],
            selectedId: 0,
            title: 'Miccai 19',
          },
        }
      }],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style/[name][hash:8].css",
      chunkFilename: "[id].css"
    }),
    new HTMLWebpackPlugin({
      title: 'Miccai',
      filename: 'index.html',
      template: srcPath('layout/index.pug'),
    }),
    new HTMLWebpackPlugin({
      title: 'Miccai',
      filename: 'data.html',
      template: srcPath('layout/data.pug'),
    }),
    new HTMLWebpackPlugin({
      title: 'Miccai',
      filename: 'submit.html',
      template: srcPath('layout/submit.pug'),
    }),
    new HTMLWebpackPlugin({
      title: 'Miccai',
      filename: 'evaluate.html',
      template: srcPath('layout/evaluate.pug'),
    }),
    new HTMLWebpackPlugin({
      title: 'Miccai',
      filename: 'result.html',
      template: srcPath('layout/result.pug'),
    }),
  ],
}
