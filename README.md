# ng-boba

> Angular Dependency Manager

## Getting Started

ngBoba can be run from the command line directly or using our [grunt plugin](https://github.com/ng-boba/grunt-ng-boba).

We recommend checking out our [ng-boba-sandbox](https://github.com/ng-boba/ng-boba-sandbox) project that has an example of how to use ngBoba with grunt.

To use the library directly, create config file similar to [ng-boba.json](https://github.com/ng-boba/ng-boba/blob/master/samples/ng-boba-config.json) and run the project with:


```shell
./addBoba.sh --config=ng-boba.json
```


### Options

#### modules
Type: `String[]`

The module's dependencies you want to bundle.

#### options.moduleFormat
Type: `String`
Default value: `'anonymous'`

The format used to define your module dependencies, `'anonymous'` or `'array'` depending on if anonymous functions or array notation is used.

Anonymous:

```js
angular.module("module").controller("ControllerName", function($scope, $timeout) {
});
```

Array:

```js
angular.module("module").controller("ControllerName", ["$scope", "$timeout", function($scope, $timeout) {
}]);
```

#### files
Type: `String[]`

The location of the files your want bundled. If you specify folder and file, folder will take priority

#### folder
Type: `String`

The location of the files your want bundled.

#### dependencies
Type: `String[]`

Scripts that cannot be detected by Angular's dependency injection, but are required for the project.
An example of this would be jQuery.

#### shims
Type: `{}`

Allows dependencies to specified manually

#### ignoreModules
Type: `String[]`

Modules that will not be included in the bundle.