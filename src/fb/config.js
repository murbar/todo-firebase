import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAXrrclFx9sjciOPXKRbUnhsTwuvZks8ug',
  authDomain: 'joelb-todo.firebaseapp.com',
  databaseURL: 'https://joelb-todo.firebaseio.com',
  projectId: 'joelb-todo',
  storageBucket: '',
  messagingSenderId: '642075999364',
  appId: '1:642075999364:web:6cba8f80c4cfa82e45d6d1',
  measurementId: 'G-WXFCKL6W6H'
};

export const fieldValues = {
  serverTimestamp: firebase.firestore.FieldValue.serverTimestamp
};

export const collections = {
  USERS: 'users',
  LISTS: 'lists',
  ITEMS: 'items'
};

firebase.initializeApp(firebaseConfig);

export default firebase;
