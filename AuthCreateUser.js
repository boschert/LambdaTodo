console.log('Loading auth functions');

// dependencies
const express = require('express');
const app = express();
const jwt = require('express-jwt');

let jwtcheck = jwt({
    secret: '3YzsJaEenLteenAlBc0T10hRcl7CH23x8UIxJjYEoK0YWmqYsN5UHPiaZo_SIFhM',
    audience: 'rgewbbOms3MXTfCdkirkBNKAdT4WuNgb'
});



const AWS = require('aws-sdk');
const crypto = require('crypto');
const util = require('util');

// Get reference to AWS clients
let dynamodb = new AWS.DynamoDB();
let ses = new AWS.SES();


