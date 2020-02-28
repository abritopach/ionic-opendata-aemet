# IonicOpenDataAemet

Sample project that shows climatological values of the Spanish stations in a range of specific dates.

## App Example

![App](readme_resources/app.gif "App")

## Running

Before you go through this example, you should have at least a basic understanding of Ionic concepts. You must also already have Ionic installed on your machine.

* Test in localhost:

To run it, cd into `ionic-opendata-aemet` and run:

```bash
npm install
ionic serve
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Capacitor: Add Platforms

``` bash
    npx cap add ios
    npx cap add android
```

## Capacitor: Syncing your app
Every time you perform a build (e.g. npm run build) that changes your web directory (default: www), you'll need to copy those changes down to your native projects:

``` bash
    npx cap copy
```

## Capacitor: Open IDE to build

``` bash
    npx cap open ios
    npx cap open android
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

// TODO: Add cypress

## Requirements

* [Node.js](http://nodejs.org/)
* [Ionic](https://ionicframework.com/getting-started#cli)
