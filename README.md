# Colour RGBA

[![NPM version][npm-version-image]][npm-url]
[![Build Status][build-status-image]][build-status-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Known Vulnerabilities][vulnerabilities-image]][vulnerabilities-url]
[![Downloads][npm-downloads-image]][npm-url]

A module for creating RGBA Colour objects and manipulating, un/packing and de/serializing them.

## Usage

```javascript
const Colour = require("colour-rgba");

// create a new colour
const myColour = new Colour(86, 75, 30, 99);

// or use a pre-defined colour
const red = Colour.LimeGreen;

// convert a colour to an array excluding the alpha channel
const colourArray = myColour.toArray(false);

// pack a colour object into a 32-bit number
const packedNumber = myColour.pack();

// unpack a colour from a 32-bit number
const unpackedColour = Colour.unpack(packedNumber);

// serialize a colour object into a buffer and include the alpha channel
const serializedColour = myColour.serialize(true);

// de-serialize a colour object from a buffer
const deserializedColour = Colour.deserialize(serializedColour);
```

## Installation

To install this module:
```bash
npm install colour-rgba
```

[npm-url]: https://www.npmjs.com/package/colour-rgba
[npm-version-image]: https://img.shields.io/npm/v/colour-rgba.svg
[npm-downloads-image]: http://img.shields.io/npm/dm/colour-rgba.svg

[build-status-url]: https://travis-ci.org/nitro404/colour-rgba
[build-status-image]: https://travis-ci.org/nitro404/colour-rgba.svg?branch=master

[coverage-url]: https://coveralls.io/github/nitro404/colour-rgba?branch=master
[coverage-image]: https://coveralls.io/repos/github/nitro404/colour-rgba/badge.svg?branch=master

[vulnerabilities-url]: https://snyk.io/test/github/nitro404/colour-rgba?targetFile=package.json
[vulnerabilities-image]: https://snyk.io/test/github/nitro404/colour-rgba/badge.svg?targetFile=package.json
