import fb from './index';

function signInWithEmailAndPassword(email, password) {
  try {
    fb.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.log(error);
  }
}

fb.onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    console.log(user);
  } else {
    // User is signed out.
  }
});
