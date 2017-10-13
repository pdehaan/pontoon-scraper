#!/usr/bin/env node

/* eslint-disable no-console */

const argv = require('yargs').argv;

const { getTranslations } = require('../lib');

if (!argv.product) {
  console.error('Error: Expected product name');
  process.exit(1);
}

getTranslations(argv.product, argv.minPct)
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.error('Unexpected error:', err.message));
