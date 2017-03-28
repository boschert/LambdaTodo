'use strict';

const todosCreate = require('./todos-create');
const todosReadAll = require('./todos-read-all.js');
const todosReadOne = require('./todos-read-one.js');
const todosUpdate = require('./todos-update.js');
const todosDelete = require('./todos-delete.js');
const userProfile = require('./userProfile');

module.exports.verifyToken = (event, context, callback) => {
 let token = event.authorizationToken.split(' ')[1];

 userProfile.getUserProfile(token)
 .then(function(profile) {
   context.succeed(generatePolicy('user', 'Allow', event.methodArn));
 })
 .catch(function(error) {
   context.fail("Unauthorized");
 })
};

let generatePolicy = function(principalId, effect, resource) {
    var authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = '2012-10-17'; // default version
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; // default action
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
}

module.exports.create = (event, context, callback) => {
  todosCreate(event, (error, result) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
    };

    context.succeed(response);
  });
};

module.exports.readAll = (event, context, callback) => {
  todosReadAll(event, (error, result) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
    };

    context.succeed(response);
  });
};

module.exports.readOne = (event, context, callback) => {
  todosReadOne(event, (error, result) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(result),
  };

  context.succeed(response);
  });
};

module.exports.update = (event, context, callback) => {
  todosUpdate(event, (error, result) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(result),
  };

  context.succeed(response);
  });
};

module.exports.delete = (event, context, callback) => {
  todosDelete(event, (error, result) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(result),
  };

  context.succeed(response);
  });
};