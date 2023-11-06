const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = function webpackConfig(env, args) {
  return {
    entry: path.join(__dirname, 'src/index.tsx'),
    output: {
      filename: 'main.js',
      path: path.join(__dirname, 'public'),
      publicPath: '/',
    },
    resolve: {
      alias: {
        app: path.resolve(__dirname, 'src/app'),
        pages: path.resolve(__dirname, 'src/pages'),
        processes: path.resolve(__dirname, 'src/processes'),
        widgets: path.resolve(__dirname, 'src/widgets'),
        features: path.resolve(__dirname, 'src/features'),
        entities: path.resolve(__dirname, 'src/entities'),
        shared: path.resolve(__dirname, 'src/shared'),
        hooks: path.resolve(__dirname, 'src/hooks'),
      },
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          // See .babelrc for further babel config
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        output: 'index.html',
      }),
      new Dotenv(),
    ],
    optimization: {
      minimizer: [
        // Omit creation of .txt files
        new (require('terser-webpack-plugin'))({ extractComments: false }),
      ],
    },
    devServer: {
      historyApiFallback: true,
      static: { directory: path.join(__dirname, 'public') },
    },
  };
};
