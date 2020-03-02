import firebase from './config';

const firestore = firebase.firestore();
// db.enablePersistence();

export const convertDocToObject = doc => {
  const data = {
    id: doc.id,
    ...doc.data()
  };
  for (const [field, value] of Object.entries(data)) {
    if (value instanceof firebase.firestore.Timestamp) {
      data[field] = value.toDate();
    }
  }
  return data;
};
export default firestore;
