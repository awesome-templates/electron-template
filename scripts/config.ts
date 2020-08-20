import { isDev, pkg } from './utils'

export const env = {
  NODE_ENV: isDev ? 'development' : 'production',
  APP_ID: pkg.build.appId as string,
}
