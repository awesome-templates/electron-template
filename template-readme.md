# Template Guide

## Main Process

The code for main process is populated under `./app` folder.

In development it will load renderer process from `http://localhost:4000`, in production it loads `./app/renderer/index.html` instead.

## Renderer Process

The code for renderer process is populated under `./renderer` folder, and we use [Poi](https://poi.js.org) to bundle it.

In development the renderer process is served at `http://localhost:4000`, in production it will be bundled to `./app/renderer` folder.

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

## Adding Dependencies

If you need to `require` or `import` the dependency in `./app`, you should install it in `./app` folder as production dependency, otherwise just install it in root folder as dev dependency.
