
var GDependencyGraph = require('../src/GDependencyGraph');

describe('GDependencyGraph', function() {
	'use strict';

	beforeEach(function () {

	});

	it('creates a graph from dependencies', function() {
		var g = new GDependencyGraph(getDependencies());
		expect(g).toBeDefined();
	});

	it('creates graph nodes from dependencies', function() {
		var g = new GDependencyGraph(getDependencies());
		expect(g.nodes.length).toBeGreaterThan(0);
	});


	function getDependencies() {
		return [
			
			// TODO: create mock dependencies
		];
	}
});
