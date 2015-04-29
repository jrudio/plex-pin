'use strict';

var assert = require('assert');
var PlexPin = require('..');

var fakeHeaders = {
  'X-Plex-Product': 'Plex+Web',
  'X-Plex-Version': '2.3.21',
  'X-Plex-Client-Identifier': 'r4zsj3rp4r4wjyvi',
  'X-Plex-Platform': 'Chrome',
  'X-Plex-Platform-Version': '41.0',
  'X-Plex-Device': 'Linux',
  'X-Plex-Device-Name': 'Plex+Web+(Chrome)',
  'Accept-Language': 'en'
};

var headerError = /Missing\srequired\sheader\(s\)/g;


describe('does PlexPin return expected properties and methods?', function() {
  it('should be of type object', function(){
    assert.equal(typeof new PlexPin(fakeHeaders), 'object');
  });

  it('should have property getPin', function(){
    assert.equal(new PlexPin(fakeHeaders).hasOwnProperty('getPin'), true);
  });

  it('should have property regEx', function(){
    assert.equal(new PlexPin(fakeHeaders).hasOwnProperty('regEx'), true);
  });

  it('should have property headers', function(){
    assert.equal(new PlexPin(fakeHeaders).hasOwnProperty('headers'), true);
  });

  it('should have property plexUrl', function(){
    assert.equal(new PlexPin(fakeHeaders).hasOwnProperty('plexUrl'), true);
  });

  it('should have property token', function(){
    assert.equal(new PlexPin(fakeHeaders).hasOwnProperty('token'), true);
  });

  it('should have property date', function(){
    assert.equal(new PlexPin(fakeHeaders).hasOwnProperty('date'), true);
  });

  it('should have property code', function(){
    assert.equal(new PlexPin(fakeHeaders).hasOwnProperty('code'), true);
  });

  it('should have property reqId', function(){
    assert.equal(new PlexPin(fakeHeaders).hasOwnProperty('reqId'), true);
  });

  it('should have property test', function(){
    assert.equal(new PlexPin(fakeHeaders).hasOwnProperty('getPin'), true);
  });

  it('should have method grabCode', function(){
    assert.equal(new PlexPin(fakeHeaders).hasOwnProperty('grabCode'), true);
  });

  it('should have method grabDate', function(){
    assert.equal(new PlexPin(fakeHeaders).hasOwnProperty('grabDate'), true);
  });

  it('should have method grabToken', function(){
    assert.equal(new PlexPin(fakeHeaders).hasOwnProperty('grabToken'), true);
  });

  it('should have method grabReqId', function(){
    assert.equal(new PlexPin(fakeHeaders).hasOwnProperty('grabReqId'), true);
  });

  it('should have method setReqId', function(){
    assert.equal(new PlexPin(fakeHeaders).hasOwnProperty('setReqId'), true);
  });

  it('should have method setCode', function(){
    assert.equal(new PlexPin(fakeHeaders).hasOwnProperty('setCode'), true);
  });

  it('should have method setToken', function(){
    assert.equal(new PlexPin(fakeHeaders).hasOwnProperty('setToken'), true);
  });

  it('should have method setDate', function(){
    assert.equal(new PlexPin(fakeHeaders).hasOwnProperty('setDate'), true);
  });

  it('should have method checkPin', function(){
    assert.equal(new PlexPin(fakeHeaders).hasOwnProperty('checkPin'), true);
  });
});

describe('PlexPin', function() {
  it('should throw an error when required headers are not present', function(){
    assert.throws(function(){ return new PlexPin(); }, headerError);
  });
});

describe('getPin()', function() {

/*  it('should return a promise', function() {
    var plexPin = new PlexPin(fakeHeaders);
    
    assert(plexPin.getPin().hasOwnProperty('then'), true);
  });
  */

  it('should set the property code', function() {
    var plexPin = new PlexPin(fakeHeaders);

    plexPin.getPin().then(function(result){
      var code = plexPin.grabCode(result);
      plexPin.setCode(code);
      assert.notEqual(typeof plexPin.code, null);
    });

  });

  it('should set the property reqId', function() {
    var plexPin = new PlexPin(fakeHeaders);

    plexPin.getPin().then(function(result){
      var reqId = plexPin.grabCode(result);
      plexPin.setReqId(reqId);
      assert.notEqual(plexPin.reqId, null);
    });

  });
});