'use strict';


module.exports = (function(){
  /*
    This app will accomplish:
    -Request a PIN from Plex.tv
      - Needs _headers
      - Client Identifier === App name
    -Poll plex.tv pin page for token auth (Max 5 minutes) (Auth Token or Error)
  */

  // Require an HTTP package to make HTTP API calls
  var rp = require('request-promise');

  // var getInfo = function(str, regExp){
  //   if(typeof str !== 'string'){ return null; }
  //   if(typeof regExp !== 'object'){ return null; }

  //   var extractedStr = str.match(regExp);
  //   console.log('Info: ' + extractedStr);
  //   return extractedStr ? extractedStr[0] : null;
  // };


  var regEx = {
    code: /\b\w+(?=<\/code>)/g,
    authToken: /\w+(?=<auth_token)/g,
    date: /([\w-:]+)(?=<\/expires-at>)/g,
    reqId: /\b\w+(?=<\/id>)/g
  };

  var plexUrl = {
    reqPin: 'https://plex.tv/pins.xml',
    /* End checkPin with '.xml' */
    checkPin: 'https://plex.tv/pins/'
  };

  /* Request Id */
  var getReqId = function(){
    return this.reqId;
  };

  var setReqId = function(id){
    this.reqId = id;

    return this;
  };

  /* Date */
  var getDate = function(){
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

  var getPlexPin = function(_headers){
    // Verify adequate information was provided
    if(typeof _headers !== 'object' || !_headers.hasOwnProperty('X-Plex-Product') || !_headers.hasOwnProperty('X-Plex-Version') || !_headers.hasOwnProperty('X-Plex-Client-Identifier') || !_headers.hasOwnProperty('X-Plex-Platform') || !_headers.hasOwnProperty('X-Plex-Platform-Version') || !_headers.hasOwnProperty('X-Plex-Device') || !_headers.hasOwnProperty('X-Plex-Device-Name') || !_headers.hasOwnProperty('Accept-Language')){
      throw new Error('Missing required header(s)');
    }

    return rp.post({ url: plexUrl.reqPin, headers: _headers });
  };

/*  var checkPlexPin = function(requestId){
    var authToken;

    // var url = plexUrl.checkPin + requestId + '.xml';

    // Poll https://plex.tv/pins/<requestId>.xml for authToken


    // Stop poll when authToken is found

    // return promise

    return authToken;
  };*/

  return {
    requestPlexPin: getPlexPin,
    regEx: regEx,
/*    checkAuth: checkPlexPin,
*/    getCode: getCode,
    setCode: setCode
    getToken: getToken,
    setToken: setToken
    getDate: getDate,
    setDate: setDate
  };
})();
