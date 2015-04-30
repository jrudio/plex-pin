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

var plexPin = new PlexPin(fakeHeaders);


describe('Are there PlexPin Properties(Simple checks)?', function() {
  it('should be of type object', function(){
    assert.equal(typeof plexPin, 'object');
  });

  it('should have headers', function(){
    assert.equal(plexPin.hasOwnProperty('headers'), true);
  });

  it('should have property regEx which in turn has pin, authToken, expireTime, & requestId as props', function(){
    assert.equal(
      !!( 
        plexPin.hasOwnProperty('regEx')
       && plexPin.regEx.hasOwnProperty('pin')
       && plexPin.regEx.hasOwnProperty('authToken')
       && plexPin.regEx.hasOwnProperty('expireTime')
       && plexPin.regEx.hasOwnProperty('requestId')
      )
    , true);
  });

  it('should have object plexUrl which has requestPin & checkPin as props', function(){
    assert.equal(
      !!( 
        plexPin.hasOwnProperty('plexUrl')
       && plexPin.plexUrl.hasOwnProperty('requestPin')
       && plexPin.plexUrl.hasOwnProperty('checkPin')
      )
    , true);
  });
});

describe('PlexPin', function() {
  it('should throw an error when required headers are not present', function(){
    assert.throws(function(){ return new PlexPin(); }, headerError);
  });

  it('should set the pin, expireTime, and requestId when calling requestPin()', function() {
    plexPin.requestPin().then(function(result){
      plexPin.setPin(result);
      plexPin.setExpireTime(result);
      plexPin.setRequestId(result);


      assert(!!(plexPin.getPin() && plexPin.getExpireTime() && plexPin.getRequestId()), true);
    });
    
  });
});