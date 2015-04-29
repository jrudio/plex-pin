'use strict';

// Require an HTTP package to make HTTP API calls
var rp = require('request-promise');

module.exports = function(headers){
  checkHeaders(headers);
  /*
    This app will accomplish:
    -Request a PIN from Plex.tv
      - Needs _headers
      - Client Identifier === App name
    -Poll plex.tv pin page for token auth (Max 5 minutes) (Auth Token or Error)
  */


  /* Initialize properties */
  this.token = null;
  this.code = null;
  this.date = null;
  this.reqId = null;
  this.headers = headers;

  this.regEx = {
   code: /\b\w+(?=<\/code>)/g,
   authToken: /\w+(?=<\/auth_token)/g,
   date: /([\w-:]+)(?=<\/expires-at>)/g,
   reqId: /\b\w+(?=<\/id>)/g 
  };

  this.plexUrl = {
    reqPin: 'https://plex.tv/pins.xml',
    /* End checkPin with '.xml' */
    checkPin: 'https://plex.tv/pins/'
  };

  /* Methods */
  this.getPin = getPlexPin;
  this.checkPin = checkPlexPin;

  this.grabCode = extractCode;
  this.grabReqId = extractRequestId;
  this.grabDate = extractDate;
  this.grabToken = extractToken;

  this.setCode = setCode;
  this.setReqId = setReqId;
  this.setToken = setToken;
  this.setDate = setDate;

};

function checkHeaders(_headers){
  if(typeof _headers !== 'object' || !_headers.hasOwnProperty('X-Plex-Product') || !_headers.hasOwnProperty('X-Plex-Version') || !_headers.hasOwnProperty('X-Plex-Client-Identifier') || !_headers.hasOwnProperty('X-Plex-Platform') || !_headers.hasOwnProperty('X-Plex-Platform-Version') || !_headers.hasOwnProperty('X-Plex-Device') || !_headers.hasOwnProperty('X-Plex-Device-Name') || !_headers.hasOwnProperty('Accept-Language')){
    throw new Error('Missing required header(s)');
  }
};

function getInfo(str, regExp){
  if(typeof str !== 'string'){ return null; }
  if(typeof regExp !== 'object'){ return null; }

  var extractedStr = str.match(regExp);
  console.log("Extacted String: " + extractedStr);
  return extractedStr ? extractedStr[0] : null;
};

function setCode(code){
  this.code = code;
};

function setReqId(id){
  this.reqId = id;
};

function setToken(token){
  this.token = token;
};

function setDate(date){
  this.date = date;
};

/* Code */
function extractCode(str){
  var codeRegEx = this.regEx.code;
  return getInfo(str, codeRegEx);
};

/* Request Id */
function extractRequestId(str){
  var requestIdRegEx = this.regEx.reqId;
  return getInfo(str, requestIdRegEx);
};

/* Authentication Token */
function extractToken(str){
  var token = this.regEx.authToken;
  return getInfo(str, token);
};

/* Date */
function extractDate(str){
  var date = this.regEx.date;
  return getInfo(str, date);
};

var getPlexPin = function(){
  var self = this;

  var url = self.plexUrl.reqPin;

  return rp.post({ url: url, headers: self.headers });
};

var checkPlexPin = function(){
  // Type-check arguments
  var self = this;

  var requestId = self.reqId;

  if(!requestId){ throw new Error('Request Id is needed'); };

  var _headers = self.headers;

  var _url = plexUrl.checkPin + requestId + '.xml';

  // Poll https://plex.tv/pins/<requestId>.xml for authToken

/*
  .then(function(response){
    var token = getInfo(response, regEx.authToken);

    console.log('Response Token: ' + token);

    if(token){
      console.log('Token was found!', 'You are now authorized!');

      // Attach to this.token
      setToken(token);

      // Cancel timer
      clearInterval(self.timer);

    }
    else{
      console.log('Token was not found');
    }
  }).catch(function(error){
    console.log('There was an error in your request');

    console.error(error.keys);

    if(error.statusCode === 404){
      console.log('Your code has expired');
    }
  });
*/
  return rp.get({ url: _url, headers: _headers });
};

/*var getDate = function(){
  return this.date;
};

var setDate = function(date){
  this.date = date;

  return this;
};

var getToken = function(){
  return this.token;
};

var setToken = function(token){
  this.token = token;

  return this;
};

var getCode = function(){
  return this.code;
};

var setCode = function(code){
  this.code = code;

  return this;
};

*/