export const isDev = process.env.NODE_ENV === 'development'

export const pkg = require('../package')
export const deps = Object.keys(pkg.dependencies)
