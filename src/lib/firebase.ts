import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';

let firebaseApp: FirebaseApp;

export const setupFirebase = () => {
  try {
    firebaseApp = initializeApp({
      apiKey: import.meta.env['VITE_FIREBASE_APIKEY'],
      authDomain: import.meta.env['VITE_FIREBASE_AUTHDOMAIN'],
      databaseURL: import.meta.env['VITE_FIREBASE_DATABASEURL'],
      projectId: import.meta.env['VITE_FIREBASE_PROJECTID'],
      storageBucket: import.meta.env['VITE_FIREBASE_STORAGEBUCKET'],
      messagingSenderId: import.meta.env['VITE_FIREBASE_MESSAGINGSENDERID'],
      appId: import.meta.env['VITE_FIREBASE_APPID'],
    });
    getAnalytics(firebaseApp);
    getPerformance(firebaseApp);
  } catch (error) {
    console.error({ error });
  }
};

let auth: Auth;
let firestore: ReturnType<typeof getFirestore>;
let storage: ReturnType<typeof getStorage>;

export const useAuth = () => {
  auth = getAuth(firebaseApp);
  return auth;
};

export const useFirestore = () => {
  if (!firestore) {
    firestore = getFirestore();
  }
  return firestore;
};

export const useStorage = () => {
  if (!storage) {
    storage = getStorage();
  }
  return storage;
};

export const emailLinkCheck = () => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }
    signInWithEmailLink(auth, email ?? '', window.location.href).then(() => {
      window.localStorage.removeItem('emailForSignIn');
    });
  }
};
