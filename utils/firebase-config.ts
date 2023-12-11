import { initializeApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'ebill-quotation-app.firebaseapp.com',
  projectId: 'ebill-quotation-app',
  storageBucket: 'ebill-quotation-app.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

setPersistence(firebaseAuth, browserSessionPersistence);
