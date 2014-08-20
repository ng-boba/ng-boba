angular.module('testWithDeps', ['dep1', 'dep2'])


angular.module('testWithDeps').controller('mycontroller', ["$http", function ($http) {
}])
