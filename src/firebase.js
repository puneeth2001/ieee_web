import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { functions } from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBt8mTbb7-mmeWH7MddaN1rDo3CaDNYT8g",
  authDomain: "aasaan-187e2.firebaseapp.com",
  databaseURL: "https://aasaan-187e2.firebaseio.com",
  projectId: "aasaan-187e2",
  storageBucket: "aasaan-187e2.appspot.com",
  messagingSenderId: "68244373835",
  appId: "1:68244373835:web:ca6c4c6206bb6600d6e8ce",
  measurementId: "G-GQY3F96L14"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
firebase.firestore().enablePersistence()
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
