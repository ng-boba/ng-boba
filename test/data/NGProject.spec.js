var NGProject = require('../../src/data/NGProject');
var MockFileObjects = require('./../mock/MockFileObjects');
var NGBobaLogger  = require('../../src/util/NGBobaLogger');
var _ = require('underscore');

describe('NGProject', function () {
  'use strict';

  var p;
  beforeEach(function () {
    p = new NGProject();
  });

  function applyDeps(p, d) {
    d.forEach(function (o) {
      p.addFileComponents(o.filePath, o.results);
    });
  }

  it('creates a graph from dependencies', function () {
    var deps = MockFileObjects.getDependencies();
    applyDeps(p, deps);
    expect(p.modules).toBeDefined();
    expect(_.size(p.modules)).toEqual(3);
  });

  it('supports basic project dependencies', function () {
    var deps = MockFileObjects.getDependencies();
    applyDeps(p, deps);
    var main = p.getModule('main');
    var moduleIncluded = p.getModule('moduleIncluded');
    expect(main.hasDependency('moduleIncluded')).toBeTruthy();
    expect(main.hasDependency('moduleExcluded')).toBeFalsy();
    expect(moduleIncluded.getComponent('awesomeDirective')).toBeDefined();
  });

  it('supports component shims', function () {
    p.addFileShims('some/file.js', [
      'main',
      'main.controller',
      'main.directive'
    ]);
    var main = p.getModule('main');
    expect(Object.keys(main.components).length).toEqual(2);

    var files = p.getBundleFiles('main');
    expect(files.length).toEqual(1);
  });

  it('generates file list without duplicates', function () {
    var deps = MockFileObjects.getDependencies();
    applyDeps(p, deps);
    var files = p.getBundleFiles('main');
    expect(files.length).toEqual(2);
    expect(files[0]).toEqual('file2.js');
  });

  it('includes module definition before components', function () {
    var deps = MockFileObjects.getDependencies('allModuleFilesIncluded');
    applyDeps(p, deps);
    var files = p.getBundleFiles('main');
    expect(files.length).toEqual(4);
    expect(files[0]).toEqual('file4.js');
    expect(files[1]).toEqual('file2.js');
  });

  it('includes children of children modules', function () {
    var deps = MockFileObjects.getDependencies('deepTree');
    applyDeps(p, deps);
    var files = p.getBundleFiles('main');
    expect(files.length).toEqual(5);
    expect(files[0]).toEqual('file1.js');
    expect(files[1]).toEqual('file2.js');
  });

  it('includes children of children modules', function () {
    var deps = MockFileObjects.getDependencies('deepTree2');
    applyDeps(p, deps);
    var files = p.getBundleFiles('main');
    expect(files.length).toEqual(4);
    expect(files[0]).toEqual('depModule5.js');
    expect(files[1]).toEqual('depModule2.js');
    expect(files[2]).toEqual('depModule3.js');
    expect(files[3]).toEqual('depModule1.js');
  });

  it('throws error if module dependency is missing', function () {
    var deps = MockFileObjects.getDependencies('missingModule');
    applyDeps(p, deps);
    expect(function () {
      var files = p.getBundleFiles('main');
    }).toThrow('[NGPT:MISM] Missing module');
  });

  it('ignores error if module dependency is missing & in ignore list', function () {
    var deps = MockFileObjects.getDependencies('missingModule');
    applyDeps(p, deps);
    expect(function () {
      var files = p.getBundleFiles('main', ['missingModule']);
    }).not.toThrow('[NGPT:MISM] Missing module');
  });

  it('throws error if module definition is missing', function () {
    var deps = MockFileObjects.getDependencies('missingModuleDefinition');
    applyDeps(p, deps);
    expect(function () {
      var files = p.getBundleFiles('main');
    }).toThrow('[NGPT:MISD] Missing module definition');
  });

  it('throws error if module dependencies are missing', function () {
    var deps = MockFileObjects.getDependencies('missingModuleDependencies');
    applyDeps(p, deps);
    expect(function () {
      var files = p.getBundleFiles('main');
    }).toThrow('[NGPT:MISM] Missing module');
  });
});
