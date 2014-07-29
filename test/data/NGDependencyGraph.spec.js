
var NGDependencyGraph = require('../../src/data/NGDependencyGraph');
var MockFileObjects = require('./../mock/MockFileObjects');

describe('NGDependencyGraph', function() {
	'use strict';

	beforeEach(function () {

	});

	it('creates a graph from dependencies', function() {
		var g = new NGDependencyGraph(MockFileObjects.getDependencies());
		expect(g).toBeDefined();
	});

	it('creates graph nodes from dependencies', function() {
		var g = new NGDependencyGraph(MockFileObjects.getDependencies());
		expect(g.nodes.length).toBeGreaterThan(0);
	});

	it('supports 1-to-1 and links dependencies from file1 to file3', function() {
		var g = new NGDependencyGraph(MockFileObjects.getDependencies());
		expect(g.nodes[0].edges.length).toEqual(1);
		var node = g.nodes[0].edges[0];
		expect(node.id).toEqual('file2.js');
	});

	it('generates 1-to-1 file list', function() {
		var g = new NGDependencyGraph(MockFileObjects.getDependencies());
		var files = g.getBundleFiles('main');
		expect(files.length).toEqual(2);
		expect(files[0]).toEqual('file2.js');
	});

	it('generates file list for all module files', function() {
		var g = new NGDependencyGraph(MockFileObjects.getDependencies('moduleIncluded'));
		var files = g.getBundleFiles('main');
		expect(files.length).toEqual(3);
		expect(files[0]).toEqual('file2.js');
		expect(files[1]).toEqual('file3.js');
	});

	// TODO: include test to ensure failure when non-modules are added as module dependencies
});
