# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Deploy Live (GitHub Pages)

This app is configured for GitHub Pages deployment with relative asset paths.

### One-time setup

1. Create an empty GitHub repository for this project.
2. Add it as your git remote:

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

3. In GitHub, open your repository settings:
	Settings -> Pages -> Build and deployment -> Source: Deploy from a branch.
4. Branch: `gh-pages` and folder: `/ (root)`.

### Deploy command

Run:

```bash
npm run deploy
```

That command builds the app and publishes the `build` folder to the `gh-pages` branch.

### Site URL

Your live URL will be:

```text
https://<your-username>.github.io/<your-repo>/
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Troubleshooting

### Test warning noise is filtered

This project filters a few known third-party test warnings in [src/setupTests.ts](src/setupTests.ts) to keep CI and local test output readable. The filtered warnings are:

1. React Router v6 future-flag deprecation warnings.
2. ReactDOM test-utils `act` deprecation warning emitted by testing-library internals.

If you want to see all raw warnings again, remove the `console.warn` and `console.error` mocks in [src/setupTests.ts](src/setupTests.ts).

### Browserslist warning appears in build

If build output shows an outdated `caniuse-lite` / Browserslist warning, run:

```bash
npx update-browserslist-db@latest
```

Then run:

```bash
npm install
```

## Project Features

This Sudoku MVP includes:

1. Light/Dark theme toggle with persistent UI preferences.
2. Font customization (Space Grotesk, Merriweather, JetBrains Mono).
3. Spotify ambiance player integration with mute/unmute and playlist selection.
4. Live Sudoku conflict highlighting (row, column, and 3x3 box rule checks).
5. Game status messaging for in-progress, conflict, complete, and solved states.
6. Toolbar actions for undo, redo, pencil mode, and new puzzle.

### Feature implementation map

1. UI settings and persistence: [src/context/UISettingsContext.tsx](src/context/UISettingsContext.tsx)
2. Settings controls: [src/components/UISettingsPanel.tsx](src/components/UISettingsPanel.tsx)
3. Spotify embed and controls: [src/components/SpotifyPlayer.tsx](src/components/SpotifyPlayer.tsx)
4. Validation helpers: [src/utils/validation.ts](src/utils/validation.ts)
5. Game status and hydration: [src/pages/Game.tsx](src/pages/Game.tsx)
6. Conflict-aware board rendering: [src/components/Board.tsx](src/components/Board.tsx)
