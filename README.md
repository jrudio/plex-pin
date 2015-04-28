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
var plexPin = require('plex-pin');

plexPin();  // => true
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