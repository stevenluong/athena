var express = require('express');
var router = express.Router();
const okta = require('@okta/okta-sdk-nodejs');
var cors = require('cors')
router.all('*', cors());
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Create a new User (register). */
router.post('/', (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body)
  const newUser = {
    profile: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      login: req.body.email
    },
    credentials: {
      password: {
        value: req.body.password
      }
    }
  };
  const client = new okta.Client({
    orgUrl: 'https://dev-607424.okta.com',
    token: "00Vjq7M1ZjOoKwf77dR0kiShSWNmfurQBXhdLFzWIk"
  });
  client
    .createUser(newUser)
    .catch(err => {
      //console.log(err.message);
      res.status(400);
      res.send(err);
    })
    .then(user => {
      console.log("In")
      //console.log(user)
      res.status(201)
      res.send(user);
    });
});

module.exports = router;
