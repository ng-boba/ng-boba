ngBoba
===================================
> Angular Dependency Manager

Angular provides powerful dependency management but it does nothing for shipping those dependencies.
ngBoba aims to fill that void and leverage the existing project dependency information to create bundles!
ngBoba generates a JSON output which can be consumed by your bundling tool of choice or fed directly
into the ng-boba-infuser for fast prototyping.

## Getting Started

ngBoba can be run from the command line directly or using our [grunt plugin](https://github.com/ng-boba/grunt-ng-boba).

We recommend checking out the [ng-boba-seed](https://github.com/ng-boba/ng-boba-seed) project that has an example of how
to use ngBoba with grunt.

To use the library directly, clone the repo, create a config file
(see [ng-boba-config.json](https://github.com/ng-boba/ng-boba/blob/master/samples/ng-boba-config.json)) and then run ngBoba.sh.

```shell
git clone https://github.com/ng-boba/ng-boba.git
cd ng-boba
./bin/addBoba.sh --config=samples/ng-boba-config.json
```

### Next Steps

Once you've generated a JSON file for your project, you can feed that into the [ng-boba-infuser](https://github.com/ng-boba/ng-boba/blob/master/samples/ng-boba-infuser.html).
Include one script tag for the infuser and point it at your ngBoba JSON output.

```html
<script src="ng-boba-infuser.js" data-ng-boba="bin/ngBobaOutput.json" data-ng-boba-built=""></script>
```

Now visit your app and watch ngBoba include your dependencies for you! If you've configured a separate build process to handle the concatenation,
you can specify that bundle via the `data-ng-boba-built` attribute and then access your app with a #built hash.

## Configuration Options

### options.modules
Type: `String[]`

Module names you want to generate dependencies against.

### options.moduleFormat
Type: `String`
Default value: `'anonymous'`

The format used to define your module dependencies, `'anonymous'` or `'array'` depending on if anonymous functions or array notation is used.

Example anonymous formatting:

```js
angular.module("module").controller("ControllerName", function($scope, $timeout) {
});
```

Example array formatting:

```js
angular.module("module").controller("ControllerName", ["$scope", "$timeout", function($scope, $timeout) {
}]);
```

### options.files
Type: `String[]`

Paths to the source files you want to generate dependencies against. If you specify folder & file, folder will take priority.

### options.folder
Type: `String`

Path to the source files you want to generate dependencies against. The folder will be traversed recursively.

### options.dependencies
Type: `String[]`

List of file paths that cannot be detected by Angular's dependency injection, but are required for the project.
An example of this would be jQuery.

```
TODO: Example of dependencies option usage
```

### options.shims
Type: `{}`

Allows Angular component definitions to be specified manually.

```
TODO: Example of shims option usage
```

### options.ignoreModules
Type: `String[]`

Names of modules to exclude in the dependency list.

### options.output
Type: `String`

Location to write the ngBoba dependency information. This can be used with the [ng-boba-infuser.js](https://github.com/ng-boba/ng-boba/blob/master/samples/ng-boba-infuser.js)
to by pass a build process and begin using ngBoba quickly.

### options.verbose
Type: `Boolean`

When getting a project setup, verbose provides more helpful error messages to facilitate debugging your application's dependencies.

