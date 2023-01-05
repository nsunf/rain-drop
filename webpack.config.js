import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.resolve();

export default {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, 'src/index.ts')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-modules-typescript-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(wav|mp3)$/, use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/views/index.html'),
      filename: 'index.html',
      chunks: ['index']
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    port: 3000
  }
}