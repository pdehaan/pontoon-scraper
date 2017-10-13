# pontoon-scraper

Scrape the Mozilla Pontoon l10n site for project translation stats.

## Installation:

```sh
$ npm i pdehaan/pontoon-scraper -S
```

## Usage:

### API:

```js
const { getTranslations } = require('pontoon-scraper');

// Get all Firefox Send translation stats where the translation %% is >=90%.
getTranslations('test-pilot-firefox-send', 90)
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.error('Unexpected error:', err.message));
```

### CLI:

```sh
$(npm bin)/pontoon-scraper --product=test-pilot-firefox-send
```

Or, if you want to filter by locales with >=92% translations, you can specify the `--min-pct` argument:

```sh
$(npm bin)/pontoon-scraper --product=test-pilot-firefox-send --min-pct=92
```

## License:

¯\\\_(ツ)\_/¯ 
