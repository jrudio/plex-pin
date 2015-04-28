'use strict';

var assert = require('assert');
var plexPin = require('..');

describe('does requestPlexPin return expected values?', function() {
  it('should be of type object', function(){
    assert.equal(typeof plexPin, 'object');
  });

  it('should have property requestPlexPin', function(){
    assert.equal(plexPin.hasOwnProperty('requestPlexPin'), true);
  });

  it('should have property regEx', function(){
    assert.equal(plexPin.hasOwnProperty('regEx'), true);
  });

  it('should have property getCode', function(){
    assert.equal(plexPin.hasOwnProperty('getCode'), true);
  });

  it('should have property setCode', function(){
    assert.equal(plexPin.hasOwnProperty('setCode'), true);
  });

});

describe('Lets test requestPin()', function() {
  it('should return an object', function() {
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

    assert.equal(typeof plexPin.requestPlexPin(fakeHeaders), 'object');
  });

  it('should throw an error when the required headers are not present', function(){
    assert.throws(function(){ return plexPin.requestPlexPin(); }, /Missing\srequired\sheader\(s\)/);
  });
});