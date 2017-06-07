# String-to-Obj

[![Build Status](https://travis-ci.org/richmondwang/string-to-obj.svg?branch=master)](https://travis-ci.org/richmondwang/string-to-obj)
[![codecov](https://codecov.io/gh/richmondwang/string-to-obj/branch/master/graph/badge.svg)](https://codecov.io/gh/richmondwang/string-to-obj)


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/string-to-obj)

> String to object properties parser for javascript

This module takes a string of key-value/value and transforms it to an object.

### Depends:

⇢ lodash >= 4.17.4


**Example:**

```js
const strToObject = require('str-to-obj');

const parser = new strToObject({
    trim: true,
    delimiters: {
        values: {
            default: ','
        },
        keyValue: ':'
    },
    blackhole: 'context'
});
console.log(parser.parse('tags:"db backup,systems" is:open is:active authors:johndoe,janedoe application crashes'));

/* Outputs:
[object Object] { 
  tags: ['db backup', 'systems'],
  is: ['open', 'active'],
  authors: ['johndoe', 'janedoe'],
  context: ['application', 'crashes']
}
*/

// if you are using `key=value` format:

const parser = new strToObject({
    delimiters: {
        keyValue: '='
    },
    blackhole: 'context'
});
console.log(parser.parse('tags="db backup,systems" is=open is=active authors=johndoe,janedoe application crashes'));

// will still output the same...
```

*No npm package yet! This project is still in progress of creating tests.*
