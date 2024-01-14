const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

exports.createUserEntities = functions
  .region('southamerica-east1')
  .runWith({ maxInstances: 4 })
  .auth.user()
  .onCreate(async user => {
    try {
      const investments = await admin
        .firestore()
        .collection('investments')
        .doc(user.uid)
        .set({
          investedAmount: 0,
          stocks: [],
          cryptos: [],
          treasuries: [],
          fixedIncomes: [],
          cash: [],
        });
      return { investments };
    } catch (error) {
      return error;
    }
  });
