'use strict';

var couchbase = require('./node_modules/ottoman/node_modules/couchbase');
var ottoman = require('ottoman');

var cluster = new couchbase.Cluster('couchbase://127.0.0.1');
ottoman.bucket = cluster.openBucket('default');

var Country = ottoman.model('Country', {
  'countryCode': {type: 'string', readonly: true},
  'gdp': 'number',
  'region-number': 'number',
  'name': 'string',
  'updated': 'Date',
  'population': 'number'
}, {
  id: 'countryCode'
});
module.exports.Country = Country;

var Customer = ottoman.model('Customer', {
  'username': {type: 'string', readonly: true},
  'firstName': 'string',
  'lastName': 'string',
  'created': 'Date',
  'billingAddress': {
    'country': {ref: Country},
    'state': 'string',
    'city': 'string',
    'line1': 'string',
    'postalCode': 'string'
  },
  'updated': 'Date',
  'email': 'string'
}, {
  id: 'username'
});
module.exports.Customer = Customer;
