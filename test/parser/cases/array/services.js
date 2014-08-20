/**
 * Some comments for fun!
 */
angular.module('test').service('TestService', ["dep1", "dep2", function (dep1, dep2) {

}]);

angular.module('test2').service('TestService2', ["dep1", "dep2", "dep3", function (dep1, dep2, dep3) {

}]);
