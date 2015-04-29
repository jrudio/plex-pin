# plex-pin [![Build Status](https://secure.travis-ci.org/jrudio/plex-pin.png?branch=master)](https://travis-ci.org/jrudio/plex-pin)

A Plex.tv PIN request module

## Note
The point of this package is so you can easily create an app that requires authentication without the user needing to input the credentials of the plex account and instead use the Plex.tv/pin api to get an authorize users via PIN.

This repository is intended to be for the npm version. 

I will create a repository for a Meteor package.

## Installation

```bash
npm install --save plex-pin
```

## Usage

```javascript
var PlexPin = require('plex-pin');

var headers = {
  'X-Plex-Product': 'Plex+Web',
  'X-Plex-Version': '2.3.21',
  'X-Plex-Client-Identifier': 'a5zsj42p4r4wjyvi',
  'X-Plex-Platform': 'Chrome',
  'X-Plex-Platform-Version': '41.0',
  'X-Plex-Device': 'Linux',
  'X-Plex-Device-Name': 'Plex+Web+(Chrome)',
  'Accept-Language': 'en'
};

var plexPin = new PlexPin(headers);

// Returns promise
plexPin.getPin(); // => promise

plexPin.getPin().then(function(result){
  var code = plexPin.grabCode(result);
  var expiration = plexPin.grabDate(result);
  var requestId = plexPin.grabReqId(result);

  plexPin.setCode(code);
  plexPin.setReqId(requestId);

  console.log('Code: %s', plexPin.code);
  console.log('Request Id: %s', plexPin.reqId);
  console.log('Expiration Time: %s', expiration);
}).catch(function(error){
  console.error('Error requesting PIN: ' + error.statusCode);
});

<!-- Get Code that has been set -->
plexPin.code; => 'HY67'

<!-- ID to monitor page for authToken -->
plexPin.reqId; => '11429629'

<!-- Auth Token -->
plexPin.token; => 'sdfhhf3232njr3nfi32ni32'

<!-- Expiration Date/Time -->
plexPin.date; => '2015-04-29T08:31:08Z'

plexPin.grabCode(result) => returns code from result of promise via regex
plexPin.grabToken(result) => returns token from result of promise via regex
plexPin.grabReqId(result) => returns request Id from result of promise via regex
plexPin.grabDate(result) => returns expiration date/time from result of promise via regex

plexPin.checkPin() => promise

<!-- Checks authorization -->
plexPin.checkPin().then(function(result){
  var token = plexPin.grabToken(result);

  if(!token){
    console.log('You are not authorized');
  }
  else{

    plexPin.setToken(token);

    console.log('You are authorized!', '\n You can access the token via plexPin.token');

    console.log('Token: %s', plexPin.token);
  }
}).catch(function(error){
  console.error('Error Checking PIN: ' + error.statusCode);

  if(error.statusCode === 404){
    console.log('Your code has expired');
  }
});
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by Justin Rudio ([@none](https://twitter.com/none)).

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).