'use strict';

var assert = require('assert');
var plexPin = require('..');

describe('is plex-pin property test available?', function() {

  it('should return true', function() {
    assert.equal(plexPin.test, true);
  });
});

/*describe('is plex-pin available?', function() {

  it('should do something awesome', function() {
    assert.equal(plexPin(), true);
  });
});
*/