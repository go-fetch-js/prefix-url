
var HttpClient = require('go-fetch');
var prefixUrl  = require('..');

HttpClient()
	.use(prefixUrl('https://api.github.com'))
	.get('/repos/go-fetch-js/prefix-url', {'User-Agent': 'go-fetch'}, function(error, response) {
		console.log(error, response.getStatus());
	})
;
