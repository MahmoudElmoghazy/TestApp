Currently includes:

- React Native
- React Navigation
- TypeScript

## Quick Start

The structure will look similar to this:

```
test-project
├── src
│   ├── components
│   ├── models
│   ├── navigators
│   ├── screens
│   ├── theme
│   ├── App.tsx
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── ignite
│   ├── ignite.json
│   └── plugins
├── index.js
├── ios
│   ├── TestApp
│   ├── TestApp-tvOS
│   ├── TestApp-tvOSTests
│   ├── TestApp.xcodeproj
│   └── TestAppTests
└── package.json

```

### ./src directory

Included in an Test App project is the `src` directory. This is a directory you would normally have to create when using vanilla React Native.

The inside of the src directory looks similar to the following:

```
├── src
│   ├── components
│   ├── models
│   ├── navigators
│   ├── screens
│   ├── theme
│   ├── App.tsx
```

**components**
This is where your React components will live. Each component will have a directory containing the `.tsx` file, and `.props` files for larger components. The app will come with some commonly used components like Button.

**navigators**
This is where your `react-navigation` navigators will live.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**App.tsx** This is the entry point to your app. This is where you will find the main App component which renders the rest of the application.