
var DependencyParser = require('../src/DependencyParser');

describe('DependencyParser', function() {
	beforeEach(function() {
	});

	it('parses single service', function() {
		var $promise = DependencyParser.parseFile('test/cases/single-service.js');
		$promise.then(function() {
			console.log('Got parse result', arguments);
			expect(true).toEqual(false);
		})
	});

	xit('must invalidate the control if the currency value starts with bad data', function() {

	});
});
