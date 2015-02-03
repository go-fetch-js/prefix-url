/**
 * Prefix each request URL with another URL unless the request URL already starts with a prefix of "http(s)://"
 * @param   {string} url The base URL
 * @returns {function(Client)}
 */
module.exports = function(url) {
	return function(client) {
		client.on('before', function(event) {

			var partialUrl = event.request.getUrl().toString();

			if (!/^http(s)?:\/\//.test(partialUrl)) {
				event.request.setUrl(url+partialUrl);
			}

		});
	};
};