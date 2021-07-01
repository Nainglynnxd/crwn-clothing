import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAE5NwnEZ41bEzkQ8XbXM8suS5AunEi7xc",
  authDomain: "crwn-db-8c869.firebaseapp.com",
  projectId: "crwn-db-8c869",
  storageBucket: "crwn-db-8c869.appspot.com",
  messagingSenderId: "345734658239",
  appId: "1:345734658239:web:9336726bfe75fcabddee0a",
  measurementId: "G-SJB9EZPJQT",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
