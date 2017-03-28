'use strict';

const request = require('request');
const Promise = require('bluebird');
const jwtVerify = Promise.promisify(require('jsonwebtoken').verify);
const env = require('./config');

function getUserProfile(authToken) {
  console.log('Get user profile');
  var secretBuffer = new Buffer(env.AUTH0_SECRET, 'base64');
  var domain = env.DOMAIN;

  var body = {
    'id_token': authToken
  };

  var options = {
    url: 'https://'+ domain + '/tokeninfo',
    method: 'POST',
    json: true,
    body: body
  };

  return jwtVerify(authToken, secretBuffer).then(function(decoded) {
    return request(options);
  }).catch(function (error) {
    console.log('Failed jwt verification: ', error, 'auth: ', authToken);
    return error;
  });
}

module.exports = {
  getUserProfile : getUserProfile
};