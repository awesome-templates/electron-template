const Store = require('electron-store')

export const config = new Store({
  defaults: {
    width: 800,
    height: 600,
  },
})
