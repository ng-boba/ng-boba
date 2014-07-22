
var GDependencyGraph = require('../src/GDependencyGraph');
var MockFileObjects = require('./mock/MockFileObjects');

describe('GDependencyGraph', function() {
	'use strict';

	beforeEach(function () {

	});

	it('creates a graph from dependencies', function() {
		var g = new GDependencyGraph(MockFileObjects.getDependencies());
		expect(g).toBeDefined();
	});

	it('creates graph nodes from dependencies', function() {
		var g = new GDependencyGraph(MockFileObjects.getDependencies());
		expect(g.nodes.length).toBeGreaterThan(0);
	});

	it('supports 1-to-1 and links dependencies from file1 to file3', function() {
		var g = new GDependencyGraph(MockFileObjects.getDependencies());
		expect(g.nodes[0].edges.length).toEqual(1);
		var node = g.nodes[0].edges[0];
		expect(node.id).toEqual('file2.js');
	});

	it('generates 1-to-1 file list', function() {
		var g = new GDependencyGraph(MockFileObjects.getDependencies());
		var files = g.getBundleFiles('main');
		expect(files.length).toEqual(2);
		expect(files[0]).toEqual('file2.js');
	});

});
