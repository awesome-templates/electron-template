import { join } from 'path'
import merge from 'webpack-merge'
import base from './webpack.config.base'

export default merge({}, base, {
  entry: './main/index.ts',
  output: {
    path: join(__dirname, '../app'),
  },
  plugins: [],
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false,
  },
})
