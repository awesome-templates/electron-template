import webpack, { Configuration } from 'webpack'
import { isDev, deps, pkg } from './utils'
import { env } from './config'

const config: Configuration = {
  mode: isDev ? 'development' : 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.mjs', '.wasm'],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(
      Object.keys(env).reduce((res, key) => {
        return {
          ...res,
          [`process.env.${key}`]: JSON.stringify((env as any)[key]),
        }
      }, {})
    ),
  ],
  externals: [
    (context, request, callback) => {
      if (deps.includes(request)) {
        return callback(null, `commonjs ${request}`)
      }
      callback()
    },
  ],
}

export default config
