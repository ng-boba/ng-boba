
angular.module('test1').controller('TestController',
	function() {

	}
);

angular
	.module('test2').controller('TestController', function() {

	}
);

angular
	.module('test3')
	.controller('TestController',
	function() {

	}
);

angular.module('test4').controller('TestController', function(
	dep1, dep2,
	dep3,
	dep4
	) {

}
);
