[![Build Status](https://travis-ci.org/teraxas/dynaform-ng.svg?branch=master)](https://travis-ci.org/teraxas/dynaform-ng)

# dynaform-ng dynamic forms engine

Dynamic forms component based on model in [dynaform-compiler lib](https://bitbucket.org/teraxas/dynaform-ng-compiler).
Built using Material components.

[DEMO Page](https://dforms-ng-demo.herokuapp.com/)

[![NPM](https://nodei.co/npm/dynaform-ng.png)](https://nodei.co/npm/dynaform-ng/)

[![Deploy DEMO](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Install

Can be installed via NPM from

```bash
npm install --save dynaform-ng
```

## Publishing

Publishing app to NPM consists of 3 steps

1. Increment version in ```package.json```
2. Run ```npm run package``` - this will create packaged version of lib in ```dist/lib```
3. Run ```npm publish``` - upload version to registry

TODO : need to script these steps to a single action.
Making publish.bat didn't work for me and running ```npm run package``` as ```npm prepare``` caused weird issues.
Consider using ```Gulp```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
