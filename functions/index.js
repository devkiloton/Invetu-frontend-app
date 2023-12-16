const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createUserEntities = functions.auth.user().onCreate(async user => {
  try {
    const users = await admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .set({
        email: user.email,
        uid: user.uid,
      });

    const investments = await admin
      .firestore()
      .collection('investments')
      .doc(user.uid)
      .set({
        investedAmount: 0,
        stocks: [],
        crypto: [],
        treasuries: [],
        companyLoans: [],
        cash: [],
      });
    return { users, investments };
  } catch (error) {
    console.log(error);
    return error;
  }
});
