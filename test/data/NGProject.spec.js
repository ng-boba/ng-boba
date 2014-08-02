
var NGProject = require('../../src/data/NGProject');
var MockFileObjects = require('./../mock/MockFileObjects');
var _ = require('underscore');

describe('NGProject', function() {
	'use strict';

	var p;
	beforeEach(function () {
		p = new NGProject();
	});

	function applyDeps(p, d) {
		d.forEach(function(o) {
			p.addFileComponents(o.filePath, o.results);
		});
	}

	it('creates a graph from dependencies', function() {
		var deps = MockFileObjects.getDependencies();
		applyDeps(p, deps);
		expect(p.modules).toBeDefined();
		expect(_.size(p.modules)).toEqual(3);
	});

	it('supports 1-to-1 and links dependencies from file1 to file2', function() {
		var deps = MockFileObjects.getDependencies();
		applyDeps(p, deps);

		var main = p.getModule('main');
		var moduleIncluded = p.getModule('moduleIncluded');
		expect(main.hasDependency('moduleIncluded')).toBeTruthy();
		expect(main.hasDependency('moduleExcluded')).toBeFalsy();
		expect(moduleIncluded.getComponent('awesomeDirective')).toBeDefined();
	});

	it('generates 1-to-1 file list without duplicates', function() {
		var deps = MockFileObjects.getDependencies();
		applyDeps(p, deps);

		var files = p.getBundleFiles('main');
		expect(files.length).toEqual(2);
		expect(files[0]).toEqual('file2.js');
	});

	xit('generates file list for all module files', function() {
		var deps = MockFileObjects.getDependencies('moduleIncluded');
		applyDeps(p, deps);

		var files = g.getBundleFiles('main');
		expect(files.length).toEqual(3);
		expect(files[0]).toEqual('file2.js');
		expect(files[1]).toEqual('file3.js');
	});

	// TODO: include test to ensure failure when non-modules are added as module dependencies
});
