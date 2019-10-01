import fb from './config';
import * as firebase from 'firebase/app';

const auth = fb.auth();

const setAuthPersistenceLocal = () => {
  // auth persisted, will be cleared on sign out
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  // .then(() => console.log('SUCCESSFUL: Auth persistence set to LOCAL'))
  // .catch(() => console.log('FAILED: Auth persistence set to LOCAL'));
};

const setAuthPersistenceSession = () => {
  // auth cleared when tab is closed
  auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
  // .then(() => console.log('SUCCESSFUL: Auth persistence set to SESSION'))
  // .catch(() => console.log('FAILED: Auth persistence set to SESSION'));
};

const createUserWithEmail = async (email, password) => {
  await auth.createUserWithEmailAndPassword(email, password);
};

const loginWithEmail = async (email, password, persist = true) => {
  await auth.signInWithEmailAndPassword(email, password);
  if (persist) {
    setAuthPersistenceLocal();
  } else {
    setAuthPersistenceSession();
  }
};

const logout = () => {
  auth.signOut();
};

const getCurrentUser = () => auth.currentUser;

const onUserChange = callback => {
  auth.onAuthStateChanged(callback);
};

export default {
  loginWithEmail,
  logout,
  getCurrentUser,
  onUserChange,
  createUserWithEmail
};
