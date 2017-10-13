const cheerio = require('cheerio');
const fetch = require('node-fetch');

module.exports = {
  getTranslations
};

function getData(url) {
  const fetchOpts = {
    headers: {
      X_REQUESTED_WITH: 'XMLHttpRequest'
    },
    method: 'GET'
  };
  return fetch(url, fetchOpts)
    .then(res => res.text());
}

function transformText(text) {
  const results = [];
  const $ = cheerio.load(text);

  // Get headers...
  // $('thead tr th').each((i, th) => {
  //   const header = $(th).text().trim();
  //   data.headers.push(header);
  // });

  // Get data...
  $('tbody tr').each((i, tr) => {
    const row = {};
    $(tr).children().each((i, td) => {
      const $td = $(td);
      const className = $td.attr('class');
      let value = $td.text().trim();

      switch (className) {
        case 'latest-activity':
          // Omit this column.
          return;
        case 'population':
          // Remove any commas so we can parse populations.
          value = value.replace(/,/g, '');
          value = parseInt(value, 10);
          break;
        case 'progress':
          value = value.trim().split('\n')[0];
          value = parseInt(value.trim(), 10);
          break;
      }
      row[className] = value;
    });
    results.push(row);
  });
  return {
    results,
    locales: getLocales(results)
  };
}

function getTranslations(project, minPct=0) {
  const url = `https://pontoon.mozilla.org/projects/${ project }/ajax/`;
  return getData(url)
    .then(text => transformText(text))
    .then(data => filterResults(data, minPct))
    .then(data => {
      data.url = url;
      return data;
    });
}

function filterResults(data, minPct) {
  const copy = Object.assign({}, data);
  copy.results = copy.results.filter(result => result.progress >= minPct);
  copy.locales = getLocales(copy.results);
  return copy;
}

function getLocales(results, defaultLocales=[]) {
  const locales = results.reduce((prev, {code}) => prev.concat(code), defaultLocales).sort();
  locales.unshift('en-US');
  return locales;
}

