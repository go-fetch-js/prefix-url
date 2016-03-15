'use strict';
const url = require('url');

/**
 * Prefix each request URL with another URL unless the request URL already starts with a prefix of "http(s)://"
 * @param   {string} prefix The base URL
 * @returns {function(Client)}
 */
module.exports = function(prefix) {
	return client => client.before((req, next) => {
    req.url = url.resolve(prefix, req.url);
    next(null, req);
  });
};