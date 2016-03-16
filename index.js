'use strict';

/**
 * Prefix each request URL with another URL unless the request URL already starts with a prefix of "http(s)://"
 * @param   {string} prefix The base URL
 * @returns {function(Client)}
 */
module.exports = function(prefix) {
	return client => client.before((req, next) => {

    if (!/^http(s)?:\/\//.test(req.url)) {

      if (prefix[prefix.length-1] === '/' && req.url[0] === '/') {
        req.url = prefix + req.url.substr(1);
      } else {
        req.url = prefix + req.url;
      }

    }

    next(null, req);
  });
};

