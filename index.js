'use strict';


module.exports = (function(){
  // Require an HTTP package to make HTTP API calls
  var rp = require('request-promise');

  var getInfo = function(str, regExp){
    if(typeof str !== 'string'){ return null; };
    if(typeof regExp !== 'object'){ return null; };

    var extractedStr = str.match(regExp);
    console.log('Info: ' + extractedStr);
    return extractedStr ? extractedStr[0] : null;
  };


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

  var getPlexPin = function(_headers){
    
    /*
      This app will accomplish:
      -Request a PIN from Plex.tv
        - Needs _headers
        - Client Identifier === App name
      -Return the response from Plex.tv (Auth Token or Error)
    */

    // Verify adequate information was provided
    if(!_headers.hasOwnProperty('product' || !_headers.hasOwnProperty('version'))
      || !_headers.hasOwnProperty('identifier') || !_headers.hasOwnProperty('platform')
      || !_headers.hasOwnProperty('platformVersion') || !_headers.hasOwnProperty('device')
      || !_headers.hasOwnProperty('deviceName') || !_headers.hasOwnProperty('language')){
      throw new Error('Missing required header(s)');
    };

    var requestCB = function(body){

      var fields = {
        body: body,
        token: getInfo(body, regEx.authToken),
        code: getInfo(body, regEx.code),
        expiresIn: getInfo(body, regEx.date),
        reqId: getInfo(body, regEx.reqId)
      };
    };



    // var requiredHeaders = [
    //   'X-Plex-Product',
    //   'X-Plex-Version',
    //   'X-Plex-Client-Identifier',
    //   'X-Plex-Platform',
    //   'X-Plex-Platform-Version',
    //   'X-Plex-Device',
    //   'X-Plex-Device-Name',
    //   'Accept-Language'
    // ];


    // We need header info such as: 
    /*
      X-Plex-Product=Plex+Web
      X-Plex-Version=2.3.21
      X-Plex-Client-Identifier=r4zsj3rp4r4wjyvi
      X-Plex-Platform=Chrome
      X-Plex-Platform-Version=41.0
      X-Plex-Device=Linux
      X-Plex-Device-Name=Plex+Web+(Chrome)
      Accept-Language=en
    */





    return rp.get({ url: _url, headers: _headers });
  };

  var checkPlexPin = function(requestId){
    var authToken;

    var url = plexUrl.checkPin + requestId + '.xml';

    // Poll https://plex.tv/pins/<requestId>.xml for authToken


    // Stop poll when authToken is found

    // return promise

    return authToken;
  };

  return {
    test: true,
    requestPlexPin: getPlexPin,
    checkAuth: checkPlexPin,
    getAuthToken
  };
})();
