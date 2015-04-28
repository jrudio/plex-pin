'use strict';


module.exports = (function(){
  // Require an HTTP package to make HTTP API calls
  var rp = require('request-promise');

  // var getInfo = function(str, regExp){
  //   if(typeof str !== 'string'){ return null; }
  //   if(typeof regExp !== 'object'){ return null; }

  //   var extractedStr = str.match(regExp);
  //   console.log('Info: ' + extractedStr);
  //   return extractedStr ? extractedStr[0] : null;
  // };


  // var regEx = {
  //   code: /\b\w+(?=<\/code>)/g,
  //   authToken: /\w+(?=<auth_token)/g,
  //   date: /([\w-:]+)(?=<\/expires-at>)/g,
  //   reqId: /\b\w+(?=<\/id>)/g
  // };

  var plexUrl = {
    reqPin: 'https://plex.tv/pins.xml',
    /* End checkPin with '.xml' */
    checkPin: 'https://plex.tv/pins/'
  };

  // var getToken = function(){
  //   return this.authToken;
  // };

  // var setToken = function(token){
  //   this.authToken = token;

  //   return this;
  // };

  var getPlexPin = function(_headers){
    
    /*
      This app will accomplish:
      -Request a PIN from Plex.tv
        - Needs _headers
        - Client Identifier === App name
      -Return the response from Plex.tv (Auth Token or Error)
    */

    // Verify adequate information was provided
    if(typeof _headers !== 'object' || !_headers.hasOwnProperty('X-Plex-Product') || !_headers.hasOwnProperty('X-Plex-Version') || !_headers.hasOwnProperty('X-Plex-Client-Identifier') || !_headers.hasOwnProperty('X-Plex-Platform') || !_headers.hasOwnProperty('X-Plex-Platform-Version') || !_headers.hasOwnProperty('X-Plex-Device') || !_headers.hasOwnProperty('X-Plex-Device-Name') || !_headers.hasOwnProperty('Accept-Language')){
      throw new Error('Missing required header(s)');
    }

    // var requestCB = function(body){

      // var fields = {
      //   body: body,
      //   token: getInfo(body, regEx.authToken),
      //   code: getInfo(body, regEx.code),
      //   expiresIn: getInfo(body, regEx.date),
      //   reqId: getInfo(body, regEx.reqId)
      // };
    // };


    return rp.get({ url: plexUrl.reqPin, headers: _headers });
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
    test: true,
    requestPlexPin: getPlexPin
/*    checkAuth: checkPlexPin,
    getToken: getToken,
    setToken: setToken
*/  };
})();
