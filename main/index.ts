import path from 'path'
import { app, BrowserWindow, Menu } from 'electron'
/// const {autoUpdater} = require('electron-updater');
import { is } from 'electron-util'
import unhandled from 'electron-unhandled'
import debug from 'electron-debug'
import contextMenu from 'electron-context-menu'
import { config } from './config'
import { menu } from './menu'

unhandled()
debug()
contextMenu()

// The value of `build.appId` in package.json
app.setAppUserModelId(process.env.APP_ID)

// Uncomment this before publishing your first version.
// It's commented out as it throws an error if there are no published versions.
// if (!is.development) {
// 	const FOUR_HOURS = 1000 * 60 * 60 * 4;
// 	setInterval(() => {
// 		autoUpdater.checkForUpdates();
// 	}, FOUR_HOURS);
//
// 	autoUpdater.checkForUpdates();
// }

// Prevent window from being garbage collected
let mainWindow: BrowserWindow | undefined

const createMainWindow = async () => {
  const win = new BrowserWindow({
    title: app.getName(),
    show: false,
    width: config.get('width'),
    height: config.get('height'),
    webPreferences: {
      nodeIntegration: is.development,
    },
  })

  win.on('ready-to-show', () => {
    win.show()
  })

  win.on('closed', () => {
    // Dereference the window
    // For multiple windows store them in an array
    mainWindow = undefined
  })

  if (is.development) {
    await win.loadURL(`http://localhost:3000`)
  } else {
    await win.loadFile(path.join(__dirname, 'renderer/index.html'))
  }

  return win
}

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
  app.quit()
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    }

    mainWindow.show()
  }
})

app.on('window-all-closed', () => {
  if (!is.macos) {
    app.quit()
  }
})

app.on('activate', async () => {
  if (!mainWindow) {
    mainWindow = await createMainWindow()
  }
})
;(async () => {
  await app.whenReady()
  Menu.setApplicationMenu(menu)
  mainWindow = await createMainWindow()
})()
