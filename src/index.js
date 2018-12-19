#!/usr/bin/env node
require('babel-polyfill');
require('babel-register')({
    presets: [ 'env' ]
});

require('./command');
