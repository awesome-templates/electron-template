import { join } from 'path'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import base from './webpack.config.base'
import webpack from 'webpack'
import { isDev, pkg } from './utils'

const useIf = <T>(value: T, condition?: boolean) => {
  return condition ? [value] : []
}

export default merge({}, base, {
  entry: [
    ...useIf('webpack-hot-middleware/client', isDev),
    './renderer/index.ts',
  ].filter(Boolean),
  output: {
    path: join(__dirname, '../app/renderer'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: isDev,
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './renderer/template.html',
      templateParameters: {
        title: pkg.productName,
        nodeModulesPath: join(__dirname, '../node_modules'),
      },
    }),
    ...useIf(new webpack.HotModuleReplacementPlugin(), isDev),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: '.',
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  target: 'electron-renderer',
})
