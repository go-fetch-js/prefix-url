'use strict';

const Client = require('go-fetch');
const prefixUrl = require('..');

new Client()
	.use(prefixUrl('https://api.github.com'))
	.get('/repos/go-fetch-js/prefix-url', {'User-Agent': 'go-fetch'})
    .then(res => console.log(res.status))
    .catch(err => console.error(err.stack))
;
