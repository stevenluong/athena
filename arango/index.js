'use strict';
const createRouter = require('@arangodb/foxx/router');
const router = createRouter();

module.context.use(router);

router.get('/hi', function (req, res) {
  res.send('γεια');
})
.response(['text/plain'], 'Hi in greek')
.summary('Greek greeting')
.description('Prints the greek greeting.');

const joi = require('joi');
const db = require('@arangodb').db;
const aql = require('@arangodb').aql;
const errors = require('@arangodb').errors;
const usersCollection = db._collection('users');
const DOC_NOT_FOUND = errors.ERROR_ARANGO_DOCUMENT_NOT_FOUND.code;

// USERS ----------------------------------------------------------------

const usersDocSchema = joi.object().keys({
  email: joi.string().required(),
  currency: joi.string(),
  country: joi.string(),
  birthdate: joi.string(),
  salary: joi.number()
}).unknown(); // allow additional attributes

router.get('/users/:sub', function (req, res) {
  const data = db._query(aql`
    FOR user IN ${usersCollection}
    FILTER user.sub == ${req.pathParams.sub}
    RETURN user
  `);
  console.log(data);
  res.send(data);
})
.pathParam('sub', joi.string().required(), 'Sub from Okta')
.response(joi.object().required(), 'User stored in the collection.')
.summary('Retrieves a user')
.description('Retrieves a user based on a sub from Okta');

router.post('/users', function (req, res) {
  const data = usersCollection.save(req.body);
  res.send(data);
})
.body(usersDocSchema, 'User to store in the collection.')
.response(joi.object().required(), 'User stored in the collection.')
.summary('Stores user')
.description('Stores a user');

router.put('/users/:key', function (req, res) {
  const data = usersCollection.replace(req.pathParams.key,req.body);
  res.send(data)
})
.body(usersDocSchema, 'User to update in the collection.')
.pathParam('key', joi.string().required(), 'Key of the user.')
.response(joi.object().required(), 'User stored in the collection.')
.summary('Updates a user')
.description('Updates a user based on a key');
