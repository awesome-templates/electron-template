const path = require('path')

module.exports = {
  entry: './renderer/index.js',
  output: {
    dir: './app/renderer',
    target: 'electron-renderer',
    publicUrl: './',
    html: {
      template: './renderer/template.html',
      nodeModulesPath:
        process.env.NODE_ENV === 'development' &&
        path.join(__dirname, 'app/node_modules')
    }
  }
}
