angular.module('test').factory('testFactory', ["dep1", "dep2", function(dep1, dep2) {

}]);

angular.module('test2').factory('testFactory2', ["dep1", "dep2", "dep3", function(dep1, dep2, dep3) {

}]);