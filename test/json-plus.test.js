require('rootpath')();

var JSONPlus = require('index');
var expect = require('chai').expect;

describe('JSONPlus', function() {
  describe('nestedString()', function() {
    describe('when getting an embedded JSON value inside an array', function() {
      var json = {
        values: [
          { embed: 'this' },
          { embed: 'is' },
          { embed: 'a' },
          { embed: 'sentence' },
          { embed: '?' }
        ]
      };
      it('should return a combined string', function() {
        expect(JSONPlus.nestedString(json, 'values.embed')).to.equal('this is a sentence ?');
      });
    });
    describe('when getting an embedded JSON value inside an array with a missing value', function() {
      var json = {
        values: [
          { embed: 'this' },
          { embed: 'is' },
          {},
          { embed: undefined },
          { embed: 'sentence' },
          { embed: '?' }
        ]
      };
      it('should return a combined string', function() {
        expect(JSONPlus.nestedString(json, 'values.embed')).to.equal('this is sentence ?');
      });
    });
    describe('when getting an embedded string value', function() {
      var json = {
        some: { key: { path: 'value' } }
      };
      it('should return the value', function() {
        expect(JSONPlus.nestedString(json, 'some.key.path')).to.equal('value');
      });
    });
    describe('when traversing an invalid key path', function() {
      var json = {};
      it('should return undefined', function() {
        expect(JSONPlus.nestedString(json, 'invalid.key.path')).to.equal(undefined);
      });
    });
  });
  describe('copy()', function() {
    describe('when a user changes values in a copied object', function() {
      it('should not affect the original object', function() {
        var originalObject = {
          first: 'value',
          second: 'field'
        };
        var copiedObject = JSONPlus.copy(originalObject);
        delete copiedObject.first;
        copiedObject.second = 'super';

        expect(copiedObject.first).to.equal(undefined);
        expect(copiedObject.second).to.equal('super');
        expect(originalObject.first).to.equal('value');
        expect(originalObject.second).to.equal('field');
      });
    });
  });
});
