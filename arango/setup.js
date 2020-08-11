// continued
'use strict';
const db = require('@arangodb').db;
const assetCollection = 'assets';
const liabilitiesCollection = 'liabilities';
const receiptsCollection = 'receipts';
const usersCollection = 'users';

if (!db._collection(usersCollection)) {
  db._createDocumentCollection(usersCollection);
}
