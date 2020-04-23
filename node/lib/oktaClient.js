const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-607424.okta.com',
  token: '00_E79okIopZ9SlSid6B-PCgiaU-AUDRQW1MQlIoi4'
});

module.exports = client;
