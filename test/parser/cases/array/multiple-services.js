angular.module('test').factory('multiPass1', ["firstDependency", "$resource", function (firstDependency, $resource) {

}]);

angular.module('test').service('multiPass2', ["secondDependency", "$http", function (secondDependency, $http) {

}]);
