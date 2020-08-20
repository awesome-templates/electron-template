import express from 'express'
import webpack from 'webpack'
import createDevMiddleware from 'webpack-dev-middleware'
import createHotMiddleware from 'webpack-hot-middleware'

process.env.NODE_ENV = 'development'

const app = express()

const rendererCompiler = webpack(require('./webpack.config.renderer').default)
const mainCompiler = webpack(require('./webpack.config.main').default)

const statsOptions = {
  children: false,
  chunks: false,
  colors: true,
  modules: false,
  chunkModules: false,
}

const devMiddleware = createDevMiddleware(rendererCompiler, {
  logLevel: 'info',
  publicPath: rendererCompiler.options.output?.publicPath!,
  stats: statsOptions,
  writeToDisk(filename) {
    return /renderer/.test(filename)
  },
})
const hotMiddleware = createHotMiddleware(rendererCompiler)
app.use(devMiddleware)
app.use(hotMiddleware)

mainCompiler.hooks.done.tap('server', (stats) => {
  console.log(stats.toString(statsOptions))
})

mainCompiler.watch({}, (err) => {
  if (err) {
    console.error(err)
    process.exitCode = 1
  }
})

app.listen(3000)
