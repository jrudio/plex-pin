'use strict';

// Require an HTTP package to make HTTP API calls
var RP = require('request-promise');

module.exports = function(headers){
  checkHeaders(headers);

  this.headers = headers;

  this.regEx = {
   pin: /\b\w+(?=<\/code>)/g,
   authToken: /\w+(?=<\/auth_token)/g,
   expireTime: /([\w-:]+)(?=<\/expires-at>)/g,
   requestId: /\b\w+(?=<\/id>)/g 
  };

  this.plexUrl = {
    requestPin: 'https://plex.tv/pins.xml',
    /* End checkPin with '.xml' */
    checkPin: 'https://plex.tv/pins/'
  };
};

module.exports.prototype.requestPin = function(){
  var url = this.plexUrl.requestPin;

  var _headers = this.headers;

  return RP.post(url, { headers: _headers });
};

module.exports.prototype.checkPin = function(requestId){
  var url = this.plexUrl.checkPin;

  url += requestId + '.xml';

  var _headers = this.headers;

  return RP.get(url, { headers: _headers });
};

module.exports.prototype.setPin = function(plexResponse){

  var codeRegEx = this.regEx.pin;

  plexResponse = getInfo(plexResponse, codeRegEx);

  this.pin = plexResponse;
};

module.exports.prototype.setRequestId = function(plexResponse){
  var reqIdRegEx = this.regEx.requestId;

  plexResponse = getInfo(plexResponse, reqIdRegEx);

  this.requestId = plexResponse;
};

module.exports.prototype.setExpireTime = function(plexResponse){
  var expireTimeRegEx = this.regEx.expireTime;

  plexResponse = getInfo(plexResponse, expireTimeRegEx);

  this.expireTime = plexResponse;
};

module.exports.prototype.setAuthToken = function(plexResponse){
  var authTokenRegEx = this.regEx.authToken;

  plexResponse = getInfo(plexResponse, authTokenRegEx);

  this.authToken = plexResponse;
};

module.exports.prototype.getPin = function(){
  return this.pin;
};

module.exports.prototype.getRequestId = function(){
  return this.requestId;
};

module.exports.prototype.getExpireTime = function(){
  return this.expireTime;
};

module.exports.prototype.getAuthToken = function(){
  return this.authToken;
};

function checkHeaders(_headers){
  if(typeof _headers !== 'object' || !_headers.hasOwnProperty('X-Plex-Product') || !_headers.hasOwnProperty('X-Plex-Version') || !_headers.hasOwnProperty('X-Plex-Client-Identifier') || !_headers.hasOwnProperty('X-Plex-Platform') || !_headers.hasOwnProperty('X-Plex-Platform-Version') || !_headers.hasOwnProperty('X-Plex-Device') || !_headers.hasOwnProperty('X-Plex-Device-Name') || !_headers.hasOwnProperty('Accept-Language')){
    throw new Error('Missing required header(s)');
  }
}

function getInfo(str, regExp){
  var extractedStr = str.match(regExp);
  return extractedStr ? extractedStr[0] : null;
}