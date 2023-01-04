const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/client/js/main.js',
    videoPlayer: './src/client/js/videoPlayer.js',
  },
  mode: 'development',
  watch: true,
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'assets'),
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'ie 11' }]],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
    ],
  },
};
