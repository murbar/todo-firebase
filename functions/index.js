const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

const db = admin.firestore();

exports.handleListDelete = functions.firestore
  .document('lists/{listId}')
  .onDelete((snap, context) => {
    const { listId } = context.params;
    return db
      .collection('items')
      .where('listId', '==', listId)
      .get()
      .then(snapshot => {
        const batch = db.batch();
        snapshot.forEach(doc => batch.delete(doc.ref));
        return batch.commit();
      });
  });
