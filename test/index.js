const expect = require('chai').expect;
const sinon = require('sinon');
const Client = require('go-fetch');
const prefixUrl = require('..');
const Request = Client.Request;

describe('prefix-url', () => {

  it('should call next()', () => {

    const client = {};
    client.before = sinon.stub().returns(client);
    prefixUrl('http://api.github.com')(client);

    const req = new Request({url: 'http://www.digitaledgeit.com.au/favicon.ico'});
    const next = sinon.spy();
    client.before.callArgWith(0, req, next);

    expect(next.calledWith(null, req)).to.be.true;

  });

	it('should not prefix URLs which already start with http://', () => {

    const client = {};
    client.before = sinon.stub().returns(client);
    prefixUrl('http://api.github.com')(client);

    const req = new Request({url: 'http://www.digitaledgeit.com.au/favicon.ico'});
    const next = sinon.spy();
    client.before.callArgWith(0, req, next);

		expect(req).property('url').to.be.equal('http://www.digitaledgeit.com.au/favicon.ico');

	});

	it('should not prefix URLs which already start with https://', () => {

    const client = {};
    client.before = sinon.stub().returns(client);
    prefixUrl('http://api.github.com')(client);

    const req = new Request({url: 'https://www.digitaledgeit.com.au/favicon.ico'});
    const next = sinon.spy();
    client.before.callArgWith(0, req, next);

    expect(req).property('url').to.be.equal('https://www.digitaledgeit.com.au/favicon.ico');

	});

	it('should prefix URLs which do not already start with http(s)://', () => {

    const client = {};
    client.before = sinon.stub().returns(client);
    prefixUrl('https://api.github.com/')(client);

    const req = new Request({url: 'users/digitaledgeit/repos'});
    const next = sinon.spy();
    client.before.callArgWith(0, req, next);

    expect(req).property('url').to.be.equal('https://api.github.com/users/digitaledgeit/repos');

	});

	it('should avoid double slashes from the middle', () => {

    const client = {};
    client.before = sinon.stub().returns(client);
    prefixUrl('https://api.github.com/')(client);

    const req = new Request({url: '/users/digitaledgeit/repos'});
    const next = sinon.spy();
    client.before.callArgWith(0, req, next);

    expect(req).property('url').to.be.equal('https://api.github.com/users/digitaledgeit/repos');

	});

  it('should prefix URL with a hostname and a directory', () => {

    const client = {};
    client.before = sinon.stub().returns(client);
    prefixUrl('http://localhost/v1')(client);

    const req = new Request({url: '/books'});
    const next = sinon.spy();
    client.before.callArgWith(0, req, next);

    expect(req).property('url').to.be.equal('http://localhost/v1/books');

  });

});
