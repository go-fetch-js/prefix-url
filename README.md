# go-fetch-prefix-url

[![Build Status](https://travis-ci.org/go-fetch-js/json.svg?branch=master)](https://travis-ci.org/go-fetch-js/json)

Prefix each request URL with another URL unless the URL is absolute.

## Installation 

    npm install --save go-fetch-prefix-url
    
## Usage

```javascript
const Client = require('go-fetch');
const prefixUrl = require('go-fetch-prefix-url');

new Client()
  .use(prefixUrl('https://api.github.com'))
  .get('/repos/go-fetch-js/prefix-url', {'User-Agent': 'go-fetch'})
    .then(res => console.log(res.status))
    .catch(err => console.error(err.stack))
;

```
