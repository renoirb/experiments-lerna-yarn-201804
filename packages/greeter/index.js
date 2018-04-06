/* eslint-disable */

'use strict'

const options = {
    mode: 'js',
    cjs: true,
}

require = require('esm')(module, options)
module.export = require('./src/index.js')

