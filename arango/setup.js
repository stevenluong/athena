// continued
'use strict';
const db = require('@arangodb').db;
const assetCollection = 'assets';
const liabilitiesCollection = 'liabilities';
const receiptsCollection = 'receipts';
const usersCollection = 'users';

if (!db._collection(assetCollection)) {
  db._createDocumentCollection(assetCollection);
}

if (!db._collection(liabilitiesCollection)) {
  db._createDocumentCollection(liabilitiesCollection);
}

if (!db._collection(usersCollection)) {
  db._createDocumentCollection(usersCollection);
}

if (!db._collection(receiptsCollection)) {
  db._createDocumentCollection(receiptsCollection);
}
