# plex-pin [![Build Status](https://secure.travis-ci.org/jrudio/plex-pin.png?branch=master)](https://travis-ci.org/jrudio/plex-pin)

A Plex.tv PIN request module

## Note
The point of this package is so you can easily create an app that requires myPlex authentication without the user needing to input the credentials of the plex account and instead use the Plex.tv/pin api to get an authorization token for users via PIN.

This repository is intended to be for the npm version. 

I will create a repository for a Meteor package.

## Installation

```bash
npm install --save plex-pin
```

## Usage

```javascript
var PlexPin = require('plex-pin');

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

var plexPin = new PlexPin(fakeHeaders);

// Request Pin
plexPin.requestPin().then(function(result){

  // PIN expires in 5 minutes
  plexPin.setExpireTime(result);
  plexPin.setPin(result);
  plexPin.setRequestId(result);

  console.log('Code: %s', plexPin.getPin());
  console.log('Request Id: %s', plexPin.getRequestId());
  console.log('Expiration Time: %s', plexPin.getExpireTime());
}).catch(function(error){
  console.error('Error requesting PIN: ' + error);
});

var requestId = '11465703';

/* Realtime applications put the following into an interval && end interval within 5 minutes */

// Check Authorization of PIN
plexPin.checkPin(requestId).then(function(result){

  // Looks for auth_token via regex & sets it
  plexPin.setAuthToken(result);

  // If token was not attached to PlexPin then one was not found
  if(!plexPin.getAuthToken()){
    console.log('You are not authorized');
  }
  else{

    // Notify user they are authorized
    console.log('You are authorized!', '\n You can access the token via plexPin.getAuthToken()');

    console.log('Token: %s', plexPin.getAuthToken());
  }
}).catch(function(error){
  console.error('Error Checking PIN: ' + error.statusCode);

  if(error.statusCode === 404){
    console.log('Your pin has expired');
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