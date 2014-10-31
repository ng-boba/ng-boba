var addBoba = require('../src/ngBoba');

describe('ngBoba', function () {
  'use strict';

  beforeEach(function () {

  });


  it('throws config errors', function () {
    expect(function() {
      addBoba();
    }).toThrow('Boba needs a config to run.');
  });

  it('throws errors when processing a folder', function() {
    var spy = jasmine.createSpy();
    runs(function() {
      addBoba({
        modules: ['foo'],
        folder: 'foobardoesntexist'
      }).catch(spy).done();
    });

    waitsFor(function() {
      return spy.callCount == 1;
    });

    runs(function() {
      expect(spy.callCount).toEqual(1);
      expect(spy.argsForCall[0][0]).toEqual('Error while parsing folder config');
    });
  });

  it('throws errors when processing a file', function() {
    var spy = jasmine.createSpy();
    runs(function() {
      addBoba({
        modules: ['foo'],
        files: ['foobardoesntexist']
      }).catch(spy).done();
    });

    waitsFor(function() {
      return spy.callCount == 1;
    });

    runs(function() {
      expect(spy.callCount).toEqual(1);
      expect(spy.argsForCall[0][0]).toEqual('Error while parsing file config');
    });
  });

});
