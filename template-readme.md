# Template Guide

## Main Process

The code for main process is populated under `./main` folder, the code is bundled to `./app` folder.

In development it will load renderer process from `http://localhost:4000`, in production it loads `./app/renderer/index.html` instead.

## Renderer Process

The code for renderer process is populated under `./renderer` folder, the code is bundled to `./app/renderer` folder.

In development the renderer process is served at `http://localhost:3000` which should be loaded in your Electron main process.

## Development

In development, you need to start main process and renderer process in two different terminal tabs:

```bash
# In tab 1:
npm run start-renderer
# In tab 2:
npm run start-main
```

## Publishing

First build the renderer code to `./app/renderer`:

```bash
npm run build-renderer
```

Then create the apps for current platform:

```bash
npm run dist
```

## Bundling Dependencies

Packages listed in `dependencies` in your `package.json` file will be excluded from the bundle, otherwise they will be bundled.
