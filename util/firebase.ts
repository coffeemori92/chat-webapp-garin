import firebase from 'firebase/app';
import ReduxSagaFirebase from 'redux-saga-firebase';

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

if (firebase.apps.length === 0) {
  var myFirebaseApp = firebase.initializeApp(firebaseConfig);
  var reduxSagaFirebase = new ReduxSagaFirebase(myFirebaseApp);
}

export { myFirebaseApp, reduxSagaFirebase };



