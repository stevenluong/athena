const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-607424.okta.com',
  token: '00ys-xtRHeptTaQamkQX-VonQV4j_DPgwGVYJcPrc7'
});

module.exports = client;
