import webpack, { Compiler } from 'webpack'

import mainConfig from './webpack.config.main'
import rendererConfig from './webpack.config.renderer'

const runCompiler = (compiler: Compiler) =>
  new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) return reject(err)
      resolve(stats)
    })
  })

async function main() {
  const mainCompiler = webpack(mainConfig)
  const rendererCompiler = webpack(rendererConfig)

  await Promise.all([runCompiler(mainCompiler), runCompiler(rendererCompiler)])
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
