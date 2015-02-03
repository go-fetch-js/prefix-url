var assert = require('assert');
var Client = require('go-fetch');
var prefixUrl = require('..');

describe('prefix-url', function() {

	it('should not prefix URLs which start with http://', function() {

		var client    = new Client();
		var plugin    = prefixUrl('http://api.github.com/');
		var request   = new Client.Request('GET', 'http://www.digitaledgeit.com.au/favicon.ico');
		var response  = new Client.Response();
		var event     = new Client.Event({
			name:     'before',
			request:  request,
			response: response
		});

		//init the plugin
		plugin(client);

		//run the plugin
		client.emit(event);

		//check the result
		assert.equal(request.getUrl().toString(), 'http://www.digitaledgeit.com.au/favicon.ico');

	});

	it('should not prefix URLs which start with https://', function() {

		var client    = new Client();
		var plugin    = prefixUrl('http://api.github.com/');
		var request   = new Client.Request('GET', 'https://www.digitaledgeit.com.au/favicon.ico');
		var response  = new Client.Response();
		var event     = new Client.Event({
			name:     'before',
			request:  request,
			response: response
		});

		//init the plugin
		plugin(client);

		//run the plugin
		client.emit(event);

		//check the result
		assert.equal(request.getUrl().toString(), 'https://www.digitaledgeit.com.au/favicon.ico');

	});

	it('should prefix URLs which do not start with http(s)://', function() {

		var client    = new Client();
		var plugin    = prefixUrl('https://api.github.com/');
		var request   = new Client.Request('GET', 'users/digitaledgeit/repos');
		var response  = new Client.Response();
		var event     = new Client.Event({
			name:     'before',
			request:  request,
			response: response
		});

		//init the plugin
		plugin(client);

		//run the plugin
		client.emit(event);

		//check the result
		assert.equal(request.getUrl().toString(), 'https://api.github.com/users/digitaledgeit/repos');

	});

});
