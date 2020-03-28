const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackCopy = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin'); //очищение dist
const HTMLWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE === 'development',
  isProd = !isDev;

const nameOutput = (ext) => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    }
  }
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin()
    ]
  }
  return config;
}
const getLoaders = exten => {
  const loaders = [{
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      },
    },
    'css-loader'
  ]
  if (exten) loaders.push(exten);
  return loaders;
};
module.exports = {
  context: path.resolve(__dirname, 'src'),
  resolve: {
    extensions: ['.js', '.json']
  },
  mode: 'development',

  entry: {
    main: ['@babel/polyfill', './index.js'],

  },
  output: {
    filename: nameOutput('js'),
    path: path.resolve(__dirname, 'dist')
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
  },

  plugins: [
    new CopyWebpackCopy([{
      from: path.resolve(__dirname, 'src/favicon.ico'),
      to: path.resolve(__dirname, 'dist')
    }]),
    new MiniCssExtractPlugin({
      filename: nameOutput('css'),
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      }
    }),
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: getLoaders()
      }, {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }

        }
      }
    ]
  }
}