/* eslint-disable no-console */

const { getTranslations } = require('./lib');

getTranslations('test-pilot-firefox-send', 90)
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.error('Unexpected error:', err.message));
